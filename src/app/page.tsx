import { AgentChat } from "@/components/chat/agent-chat";
import {
  BadgeCheck,
  PenTool,
  Sparkles,
  Video as VideoIcon,
} from "lucide-react";

const highlights = [
  {
    title: "تصميمات سوشيال ميديا",
    description:
      "قوالب جاهزة لكل منصة، مع توصيات لحجم العناصر، الصياغة المتوافقة، وجدولة النشر.",
    icon: <PenTool className="size-5 text-sky-300" />,
  },
  {
    title: "شعارات وهوية متكاملة",
    description:
      "من لوحة الألوان إلى خطوط النظام الطباعية، مع دليل استخدام قابل للتصدير.",
    icon: <BadgeCheck className="size-5 text-sky-300" />,
  },
  {
    title: "فيديوهات موشن",
    description:
      "Storyboard + script + اقتراحات موشن جرافيك مع مرجع للموسيقى والـ VO.",
    icon: <VideoIcon className="size-5 text-sky-300" />,
  },
];

const workflow = [
  {
    step: "01",
    title: "فهم العلامة والجمهور",
    body: "جمع موجز سريع، تحليل تنافسي، واستخراج نبرة الصوت المناسبة بكلتا اللغتين.",
  },
  {
    step: "02",
    title: "بناء نظام الهوية",
    body: "إنشاء moodboards، اختيار لوحة الألوان، تحديد الخطوط، تصميم الشعارات والـ patterns.",
  },
  {
    step: "03",
    title: "إطلاق الحملة",
    body: "إنتاج المحتوى لكل منصة، كتابة السكريبتات، وتوليد جدول نشر، مع ملفات جاهزة للتحميل.",
  },
];

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 md:gap-20 md:px-10 lg:px-20">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-10">
          <div className="glass relative overflow-hidden px-8 py-10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent" />
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
              <Sparkles className="size-4 text-sky-300" />
              BrandFlow Studio
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-snug text-slate-50 md:text-5xl lg:text-6xl">
              مساعد إبداعي يبني هويتك ويخرج حملاتك من أول فكرة لآخر ملف.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-slate-300 md:text-lg">
              تحدث مع BrandFlow بالعربية أو الإنجليزية ليولد لك تصميمات سوشيال
              ميديا احترافية، شعارات متفردة، أدلة هوية بصرية، وملفات فيديو كاملة
              الجاهزية للنشر. كل ذلك بسرعة فرق الإبداع وبدقة مديري الفن.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
              <span className="rounded-full border border-sky-500/40 px-5 py-2">
                Brand Strategy
              </span>
              <span className="rounded-full border border-sky-500/40 px-5 py-2">
                Design Systems
              </span>
              <span className="rounded-full border border-sky-500/40 px-5 py-2">
                Motion Scripts
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="glass flex flex-col gap-3 px-6 py-6 text-slate-200 transition hover:border-sky-400/50 hover:text-slate-50"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                  {item.icon}
                  {item.title}
                </span>
                <p className="text-sm leading-6 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="min-h-[600px]">
          <AgentChat />
        </div>
      </section>

      <section className="glass grid gap-8 px-8 py-12">
        <header className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
            Smart Workflow
          </p>
          <h2 className="text-3xl font-semibold text-slate-50">
            مسار عمل متكامل من الإلهام إلى التسليم
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            يدير BrandFlow كل مرحلة: يجمع موجز المشروع، يحول الاستراتيجية إلى
            نظام تصميم، ويجهز المواد المطلوبة للنشر الرقمي أو العرض على العميل.
            كل جلسة تحفظ تلقائياً ويمكن تصديرها بصيغة قابلة للمشاركة.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {workflow.map((item) => (
            <article
              key={item.step}
              className="flex flex-col gap-4 rounded-3xl border border-slate-800/60 bg-slate-950/50 p-6"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.5em] text-slate-500">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold text-slate-50">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-10 rounded-[2.5rem] border border-sky-500/30 bg-slate-900/40 px-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
            Deliverables
          </p>
          <h2 className="text-3xl font-semibold text-slate-50">
            ماذا تستلم من BrandFlow؟
          </h2>
          <ul className="grid gap-4 text-sm leading-7 text-slate-300">
            <li className="rounded-2xl border border-slate-800/60 bg-slate-950/40 px-5 py-4">
              <span className="font-semibold text-slate-50">
                ملفات تصميم جاهزة لكل منصة
              </span>
              <p className="mt-2 text-xs leading-6 text-slate-400">
                صور ثابتة، reels، مقاطع تيك توك، عروض شرائح، وكل نسخة مهيأة بالأبعاد
                المناسبة لكل قناة نشر.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-800/60 bg-slate-950/40 px-5 py-4">
              <span className="font-semibold text-slate-50">Brand Bible متكامل</span>
              <p className="mt-2 text-xs leading-6 text-slate-400">
                دليل PDF بالعربية والإنجليزية يشرح بنية الهوية، استخدام الشعار،
                الألوان، شبكات التصميم، والأمثلة التطبيقية.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-800/60 bg-slate-950/40 px-5 py-4">
              <span className="font-semibold text-slate-50">
                ملفات فيديو وموشن
              </span>
              <p className="mt-2 text-xs leading-6 text-slate-400">
                ستوري بورد، نص التعليق الصوتي، قائمة المشاهد، والوثائق الجاهزة لأدوات
                الموشن مثل After Effects أو CapCut.
              </p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 rounded-3xl border border-slate-800/60 bg-gradient-to-b from-sky-500/15 via-slate-900/60 to-slate-950/80 p-8">
          <h3 className="text-2xl font-semibold text-slate-50">
            جاهز للانطلاق خلال دقائق
          </h3>
          <p className="text-sm leading-7 text-slate-200">
            اربط حسابك مع BrandFlow، عرّفنا بأهداف العلامة، وابدأ جلسة مع المدير
            الإبداعي الذكي. يحتفظ النظام بكل الجلسات ويمكنك العودة لها في أي وقت.
          </p>
          <div className="grid gap-4 text-sm text-slate-200">
            <span className="rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4">
              🔄 مزامنة مع أدواتك: Figma، Notion، Cloud Storage (قريباً)
            </span>
            <span className="rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4">
              🧠 يعمل بأحدث نماذج الذكاء الاصطناعي لإخراج أفكار متجددة ومتناسقة.
            </span>
            <span className="rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4">
              🌍 دعم كامل للغة العربية والإنجليزية في التصاميم والنسخ.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
