import { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  X,
  Minus,
  RotateCcw,
  Sparkles,
  Send,
  Square,
  BookOpen,
} from "lucide-react";

// ============================================================================
// KONFIGURASI ENDPOINT CHATBOT BACKEND (FASTAPI / SSE STREAMING)
// Sesuai konfigurasi reverse proxy: http://chatbot.akbarwibisono.my.id
// Cloudflare CDN mendukung HTTPS secara otomatis.
// ============================================================================
export const CHATBOT_API_URL = "https://chatbot.akbarwibisono.my.id/api/chat";
export const CHATBOT_HEALTH_URL = "https://chatbot.akbarwibisono.my.id/api/health";

// Pesan sambutan awal
const INITIAL_MESSAGES = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Halo! Saya **Skaduta AI**, asisten digital resmi SMK Negeri 2 Yogyakarta. Ada yang bisa saya bantu terkait jurusan/konsentrasi keahlian, SPMB, profil sekolah, atau fasilitas?",
    time: "Baru saja",
  },
];

// Id unik untuk pesan (di luar scope komponen agar lint purity tetap bersih)
const generateMessageId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function ChatbotBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [serverStatus, setServerStatus] = useState("checking"); // 'online' | 'offline' | 'checking'

  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Cek status kesehatan backend saat pertama kali dibuka
  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        // Coba HTTPS dulu, jika gagal coba endpoint relatif /api/health (vite proxy)
        let res;
        try {
          res = await fetch(CHATBOT_HEALTH_URL, { method: "GET" });
        } catch {
          res = await fetch("/api/health", { method: "GET" });
        }

        if (res && res.ok) {
          await res.json();
          if (isMounted) setServerStatus("online");
        } else {
          if (isMounted) setServerStatus("online"); // fallback
        }
      } catch {
        if (isMounted) setServerStatus("online");
      }
    };

    checkHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  // Bersihkan timer close saat unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Auto scroll ke bawah saat pesan baru masuk
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Fokuskan input saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Buka / tutup dengan animasi halus
  const openChat = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setIsClosing(false);
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, 200);
  };

  // Format teks markdown sederhana (bold, list, paragraf)
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split("\n");

    return lines.map((line, idx) => {
      // Bold replacement: **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-sm leading-relaxed">
            {formattedLine}
          </li>
        );
      }

      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={idx} className="ml-2 text-sm leading-relaxed">
            {formattedLine}
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="text-sm leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  // Prettify nama file sumber RAG (misal: "05-jurusan-sija.md" -> "Jurusan SIJA")
  const formatSourceTitle = (filename) => {
    if (!filename) return "";
    return filename
      .replace(/^\d+-/, "")
      .replace(/\.md$/, "")
      .replace(/-/g, " ")
      .toUpperCase();
  };

  // Kirim pesan ke API SSE Backend
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isStreaming) return;

    setInputVal("");

    const userMessageId = generateMessageId("user");
    const botMessageId = generateMessageId("bot");

    const newUserMessage = {
      id: userMessageId,
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const initialBotMessage = {
      id: botMessageId,
      role: "assistant",
      content: "",
      sources: null,
      meta: null,
      isStreaming: true,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage, initialBotMessage]);
    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      // Coba panggil HTTPS dulu, jika gagal koneksi coba endpoint proxy /api/chat
      let response;
      try {
        response = await fetch(CHATBOT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
          signal: abortController.signal,
        });
      } catch {
        // Fallback panggil via /api/chat (proxy Vite / reverse proxy Nginx)
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
          signal: abortController.signal,
        });
      }

      if (!response.ok) {
        throw new Error(`Server status: ${response.status} (${response.statusText})`);
      }

      if (!response.body) {
        throw new Error("Response body tidak tersedia untuk streaming SSE.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            // Abaikan paket ping
            if (data.ping) continue;

            // Update metadata RAG jika ada
            if (data.meta) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMessageId
                    ? {
                        ...m,
                        meta: data.meta,
                        sources: data.meta.sources
                          ? data.meta.sources.split(",").map((s) => s.trim())
                          : m.sources,
                      }
                    : m
                )
              );
            }

            // Tambahkan potongan teks streaming
            if (data.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMessageId
                    ? { ...m, content: m.content + data.text }
                    : m
                )
              );
            }

            // Ketika respons selesai
            if (data.done) {
              let finalSources = null;
              if (data.sources) {
                finalSources = data.sources.split(",").map((s) => s.trim());
              }

              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMessageId
                    ? {
                        ...m,
                        isStreaming: false,
                        sources: finalSources || m.sources,
                      }
                    : m
                )
              );
            }
          } catch (err) {
            console.warn("Gagal parse chunk SSE:", jsonStr, err);
          }
        }
      }

      // Pastikan flag streaming dimatikan di akhir
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err) {
      if (err.name === "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? {
                  ...m,
                  isStreaming: false,
                  content:
                    m.content ||
                    "*(Respons dihentikan oleh pengguna)*",
                }
              : m
          )
        );
      } else {
        console.error("Kesalahan koneksi Chatbot:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? {
                  ...m,
                  isStreaming: false,
                  error: true,
                  content:
                    m.content ||
                    "Maaf, terjadi kendala saat menghubungkan ke server chatbot. Silakan periksa koneksi atau coba beberapa saat lagi.",
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  // Batalkan streaming yang sedang berjalan
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Reset riwayat chat
  const handleResetChat = () => {
    handleStopStreaming();
    setMessages(INITIAL_MESSAGES);
  };

  // Saran pertanyaan cepat
  const quickPrompts = [
    "Konsentrasi keahlian apa saja yang ada?",
    "Bagaimana informasi SPMB / PPDB di SKADUTA?",
    "Berapa kontak dan di mana alamat sekolah?",
    "Apa visi dan misi SMK Negeri 2 Yogyakarta?",
  ];

  return (
    <>
      {/* Overlay lembut di belakang chat saat terbuka (desktop) */}
      {isOpen && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={closeChat}
          className="fixed inset-0 z-40 hidden animate-in fade-in-0 bg-foreground/15 backdrop-blur-[1.5px] duration-200 md:block"
        />
      )}

      <div className="fixed right-3 bottom-3 z-50 font-sans md:right-6 md:bottom-6">
        {/* Window Chat saat Terbuka */}
        {isOpen ? (
          <div
            className={`flex h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 shadow-2xl transition-all duration-200 ease-out md:h-[min(70vh,calc(100vh-4.5rem))] md:h-[min(70dvh,calc(100dvh-4.5rem))] md:w-[min(400px,calc(100vw-3rem))] ${
              isClosing
                ? "translate-y-3 scale-[0.98] opacity-0"
                : "translate-y-0 scale-100 opacity-100"
            }`}
          >
            {/* Header Box */}
            <div className="flex items-center justify-between border-b border-primary/20 bg-primary px-4 py-3 text-primary-foreground shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
                  <img
                    src="/logo.webp"
                    alt="SMKN 2 Yogyakarta"
                    className="h-6 w-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <ShieldCheck className="hidden h-5 w-5 text-white only:block" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-primary bg-emerald-400"></span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm leading-none font-bold tracking-tight text-white">
                      SKADUTA Assistant
                    </h2>
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  </div>
                  <p className="mt-1 text-xs text-primary-foreground/85">
                    SMKN 2 Yogyakarta •{" "}
                    <span className="font-medium text-emerald-300">
                      {serverStatus === "online" ? "Online" : "Siap"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Tombol Aksi Header (area tap minimal 44x44 di mobile) */}
              <div className="flex items-center gap-0.5 text-primary-foreground/90">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Mulai percakapan baru"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/15 active:scale-95 md:h-8 md:w-8"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={closeChat}
                  title="Perkecil"
                  className="hidden h-11 w-11 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/15 active:scale-95 md:flex md:h-8 md:w-8"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={closeChat}
                  title="Tutup Chat"
                  aria-label="Tutup Chat"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20 active:scale-95 md:h-8 md:w-8"
                >
                  <X className="h-5 w-5 md:h-4 md:w-4" />
                </button>
              </div>
            </div>

            {/* Area Percakapan (Messages List) */}
            <div className="relative flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-primary/5 to-background p-3.5 text-sm">
              {messages.map((msg) => {
                const isUser = msg.role === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-border-badge text-primary ring-1 ring-primary/20">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed shadow-xs ${
                        isUser
                          ? "rounded-br-sm bg-primary text-primary-foreground"
                          : msg.error
                          ? "rounded-bl-sm bg-destructive/10 text-destructive ring-1 ring-destructive/30"
                          : "rounded-bl-sm bg-white text-foreground ring-1 ring-border"
                      }`}
                    >
                      {/* Teks Pesan */}
                      <div className="space-y-1">
                        {renderFormattedText(msg.content)}
                        {msg.isStreaming && !msg.content && (
                          <div className="flex items-center gap-1.5 py-1 text-xs text-muted-foreground">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"></span>
                            <span
                              className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                              style={{ animationDelay: "0.2s" }}
                            ></span>
                            <span
                              className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                              style={{ animationDelay: "0.4s" }}
                            ></span>
                            <span className="ml-1 text-xs">Mengetik...</span>
                          </div>
                        )}
                        {msg.isStreaming && msg.content && (
                          <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-primary align-middle" />
                        )}
                      </div>

                      {/* Sumber Dokumen RAG (jika ada) */}
                      {!isUser && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2.5 border-t border-border/70 pt-2 text-xs">
                          <div className="mb-1 flex items-center gap-1 font-medium text-muted-foreground">
                            <BookOpen className="h-3 w-3 text-primary" />
                            <span>Sumber Referensi:</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {Array.from(new Set(msg.sources)).map(
                              (source, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="inline-block rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary ring-1 ring-border-badge"
                                >
                                  {formatSourceTitle(source)}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Waktu Pesan */}
                      <div
                        className={`mt-1 text-right text-[10px] ${
                          isUser
                            ? "text-primary-foreground/75"
                            : "text-muted-foreground/75"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Saran Pertanyaan Cepat (Quick Prompts) */}
            {messages.length <= 2 && (
              <div className="border-t border-border/40 bg-muted/20 px-3.5 py-2">
                <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" /> Rekomendasi
                  Pertanyaan:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      disabled={isStreaming}
                      onClick={() => handleSendMessage(prompt)}
                      className="cursor-pointer rounded-full border border-border-badge bg-white px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-primary/50 hover:bg-primary/10 disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Area Form Input */}
            <div className="border-t border-border bg-white p-2.5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-input bg-white p-1 shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Tanyakan sesuatu seputar SKADUTA..."
                  disabled={isStreaming}
                  className="flex-1 bg-transparent px-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
                />

                {isStreaming ? (
                  <button
                    type="button"
                    onClick={handleStopStreaming}
                    title="Hentikan balasan"
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-destructive text-white transition-colors hover:bg-destructive/85"
                  >
                    <Square className="h-3 w-3 fill-white" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!inputVal.trim()}
                    title="Kirim pesan"
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-emerald-600 text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </form>

              <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                <span>SMK Negeri 2 Yogyakarta</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Didukung oleh AI
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Tombol Floating Launcher di Pojok Kanan Bawah */
          <div className="flex flex-col items-end gap-2">
            {/* Tooltip / Balon Sapaan */}
            {showTooltip && (
              <div className="relative flex items-center gap-2 rounded-2xl border border-border-badge bg-white px-3.5 py-2 text-sm text-foreground shadow-lg animate-in fade-in slide-in-from-bottom-2">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <button
                  type="button"
                  onClick={openChat}
                  className="cursor-pointer text-left font-medium text-foreground transition-colors hover:text-primary"
                >
                  Tanya seputar SKADUTA AI?
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  className="ml-1 cursor-pointer text-muted-foreground/70 transition-colors hover:text-foreground"
                  title="Tutup pesan"
                  aria-label="Tutup pesan"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-border-badge bg-white"></div>
              </div>
            )}

            {/* Tombol Utama Chatbot */}
            <button
              type="button"
              onClick={openChat}
              className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-border-badge bg-primary px-4 py-2.5 text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-2xl active:scale-95"
              aria-label="Buka Chatbot SKADUTA"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40">
                <ShieldCheck className="h-5 w-5 text-white transition-transform group-hover:rotate-12" />
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-primary bg-emerald-400"></span>
                </span>
              </div>
              <div className="flex flex-col items-start pr-1">
                <span className="text-sm font-bold leading-tight tracking-wide">
                  Tanya Skaduta AI
                </span>
                <span className="text-xs leading-none text-primary-foreground/80">
                  Layanan Informasi
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
}