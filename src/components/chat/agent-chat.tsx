"use client";

import {
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Loader2,
  Paperclip,
  Send,
  Sparkle,
  LayoutDashboard,
  Palette,
  Video,
} from "lucide-react";
import clsx from "clsx";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type QuickPrompt = {
  title: string;
  description: string;
  prompt: string;
  icon: "sparkle" | "layout" | "palette" | "video";
};

const quickPrompts: QuickPrompt[] = [
  {
    title: "خطة محتوى ٧ أيام",
    description: "أفكار بوستات وإنفوجرافيك مع نسخ عربية وإنجليزية.",
    prompt:
      "أريد خطة محتوى لمدة 7 أيام لمنصة إنستجرام لعلامة متخصصة في منتجات العناية بالبشرة. قدم أفكار منشورات، الصياغة بالعربية والإنجليزية، ألوان مقترحة، ونمط تصميم لكل يوم.",
    icon: "layout",
  },
  {
    title: "هوية بصرية كاملة",
    description: "ألوان، خطوط، نبرة الصوت، استخدام الصور والأيقونات.",
    prompt:
      "صمم هوية بصرية كاملة لمطعم مأكولات صحية. حدد لوحة الألوان، الخطوط الأساسية والفرعية، أسلوب التصوير، أشكال الأيقونات، نبرة المحتوى، وقدم نموذج كتيب دليل استخدام.",
    icon: "palette",
  },
  {
    title: "شعار مميز",
    description: "أشكال مقترحة، معاني، استخدامات متعددة.",
    prompt:
      "صمم عدة أفكار لشعار مبتكر لمنصة تعليم إلكتروني تستهدف الشباب. قدم وصفًا بصريًا، ودلالات الألوان، وطرق الاستخدام على ملفات تعريف اجتماعية وورق رسمي.",
    icon: "sparkle",
  },
  {
    title: "فيديو إعلان",
    description: "ستوري بورد، سكريبت، اقتراحات موشن وجرافيك.",
    prompt:
      "أحتاج فيديو إعلان لمدة 30 ثانية لإطلاق تطبيق لخدمات تنظيم الوقت. قدم ستوري بورد، سكريبت صوتي، أسلوب موشن جرافيك، واقتراحات صوتيات وموسيقى.",
    icon: "video",
  },
];

const iconMap: Record<QuickPrompt["icon"], ReactElement> = {
  sparkle: <Sparkle className="size-4 text-sky-300" />,
  layout: <LayoutDashboard className="size-4 text-sky-300" />,
  palette: <Palette className="size-4 text-sky-300" />,
  video: <Video className="size-4 text-sky-300" />,
};

const initialDraft =
  "مرحباً BrandFlow، أحتاج مساعدتك لتلخيص قدراتك وكيف يمكن أن ندير مشروع تصميم من البداية للنهاية.";

const createId = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

export function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(initialDraft);
  const [selectedPrompt, setSelectedPrompt] = useState<QuickPrompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const historyPayload = useMemo(
    () =>
      messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    [messages],
  );

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    setError(null);
    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content,
    };

    const optimisticMessages = [...messages, userMessage];
    setMessages(optimisticMessages);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...historyPayload,
            { role: "user", content },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error((await response.json())?.error ?? "Request failed");
      }

      const data = (await response.json()) as { content: string };
      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: data.content,
      };
      setMessages((current) => [...current, assistantMessage]);
    } catch (err) {
      const fallbackMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content:
          "حدث خطأ أثناء المعالجة. تأكد من إعداد مفتاح OpenAI ثم حاول مرة أخرى.",
      };
      setMessages((current) => [...current, fallbackMessage]);
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    await sendMessage(input);
  };

  const onTemplateClick = (item: QuickPrompt) => {
    setSelectedPrompt(item);
    setInput(item.prompt);
  };

  const onSystemDemo = (prompt: string) => {
    setSelectedPrompt(null);
    void sendMessage(prompt);
  };

  return (
    <section className="glass relative flex h-full w-full flex-col overflow-hidden border border-sky-500/20 bg-slate-900/60">
      <header className="flex flex-col gap-4 border-b border-slate-800/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">
              BrandFlow Agent
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-50">
              مساحة تواصل ذكية للهوية البصرية
            </h2>
          </div>
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-full bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200 transition hover:bg-sky-400/20"
            onClick={() =>
              onSystemDemo(
                "استعرض سير العمل الكامل لإنشاء هوية بصرية من الاجتماع الأول حتى التسليم النهائي.",
              )
            }
            disabled={isLoading}
          >
            <Sparkle className="size-4 transition group-hover:scale-110" />
            Flow
          </button>
        </div>
        <p className="text-sm leading-6 text-slate-300">
          صُمم الذكاء الاصطناعي BrandFlow ليعمل كمدير إبداعي كامل: يرسم
          الاستراتيجيات، يصنع لوحات الإلهام، يكتب نسخ المحتوى، يقترح أنظمة
          تصميم قابلة للتنفيذ، ويُعد مواد إطلاق متكاملة باللغتين العربية
          والإنجليزية.
        </p>
      </header>

      <div
        className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-6"
        ref={scrollContainer}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {quickPrompts.map((item) => (
            <button
              key={item.title}
              className={clsx(
                "group flex flex-col gap-2 rounded-2xl border border-slate-800/60 bg-slate-900/80 px-4 py-4 text-start transition hover:border-sky-400/60 hover:bg-slate-900/60",
                selectedPrompt?.title === item.title &&
                  "border-sky-400 bg-slate-900/50",
              )}
              onClick={() => onTemplateClick(item)}
              type="button"
              disabled={isLoading}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-sky-200">
                {iconMap[item.icon]}
                {item.title}
              </span>
              <span className="text-sm text-slate-300">{item.description}</span>
            </button>
          ))}
        </div>

        <div className="grid flex-1 gap-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className={clsx(
                "flex max-w-3xl flex-col gap-2 rounded-2xl border px-4 py-3 text-sm shadow-sm",
                message.role === "user"
                  ? "self-end border-sky-500/30 bg-sky-500/10 text-slate-100"
                  : "self-start border-slate-800 bg-slate-950/60 text-slate-200",
              )}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                {message.role === "user" ? "أنت" : "BrandFlow"}
              </span>
              <p className="whitespace-pre-wrap leading-7 text-slate-100">
                {message.content}
              </p>
            </article>
          ))}

          {messages.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-700/80 bg-slate-900/60 p-10 text-center text-slate-300">
              <Sparkle className="size-10 text-sky-300" />
              <p className="text-base leading-7">
                إسحب أي قالب من الأعلى، أو اكتب ما تريد أن يبنيه لك BrandFlow. تحدث
                معه عن استراتيجية العلامة، الملفات المطلوبة، أو اطلب جلسة عصف
                ذهني فورية.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-xs">
                <span className="rounded-full border border-slate-700/60 px-3 py-1">
                  Moodboard Builder
                </span>
                <span className="rounded-full border border-slate-700/60 px-3 py-1">
                  Campaign Scripts
                </span>
                <span className="rounded-full border border-slate-700/60 px-3 py-1">
                  Brand Guidelines PDF
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative border-t border-slate-800/60 bg-slate-950/70 p-6"
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/80 p-4">
          <label htmlFor="message" className="text-xs font-semibold text-slate-300">
            ماذا تريد أن يبني لك BrandFlow اليوم؟
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-xl border border-transparent bg-slate-950/70 p-4 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-sky-400/60 disabled:cursor-not-allowed"
            placeholder="اكتب طلبك بالتفصيل: نوع التصميم، المنصة، اللغة، مدة الفيديو، أو أي عناصر يجب الالتزام بها."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isLoading}
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 rounded-full border border-slate-700/80 px-3 py-1">
                <Paperclip className="size-3" />
                ارفق موجز المشروع (قريباً)
              </span>
              {error && (
                <span className="rounded-full border border-rose-500/60 px-3 py-1 text-rose-200">
                  {error}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:bg-slate-600/60 disabled:text-slate-300"
              disabled={isLoading || input.trim().length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  جاري الإنشاء
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  أرسل الطلب
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
