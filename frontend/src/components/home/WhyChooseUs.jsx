import {
  FiShield,
  FiEdit3,
  FiClock,
  FiMessageCircle,
} from "react-icons/fi";

const reasons = [
  {
    icon: FiShield,
    title: "Quality First",
    description:
      "We focus on reliable construction practices and quality materials.",
  },
  {
    icon: FiEdit3,
    title: "Planned Execution",
    description:
      "Every project starts with clear planning and practical execution.",
  },
  {
    icon: FiClock,
    title: "Timely Delivery",
    description:
      "We maintain structured project planning to keep work on track.",
  },
  {
    icon: FiMessageCircle,
    title: "Clear Communication",
    description:
      "Clients stay informed throughout the important stages of the project.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ================= IMAGE ================= */}

          <div className="relative">

            <div className="rounded-3xl overflow-hidden">

              <img
                src="/images/about-construction.jpg"
                alt="Laxmi Construction team and project"
                className="w-full h-[420px] sm:h-[500px] object-cover transition-transform duration-700 hover:scale-[1.02]"
              />

            </div>

            {/* Floating card */}

            <div className="absolute -bottom-6 right-4 sm:right-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-6 max-w-[230px]">

              <p className="text-3xl font-bold text-[#0F2D4A]">
                100%
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Focus on quality & client satisfaction
              </p>

              <div className="mt-4 h-1 w-14 bg-orange-500 rounded-full" />

            </div>

          </div>

          {/* ================= CONTENT ================= */}

          <div>

            <p className="text-orange-500 text-sm font-bold tracking-[0.2em] uppercase mb-3">
              Why Laxmi Construction
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2D4A] leading-tight">

              Built On Quality.

              <span className="block text-slate-400">
                Driven By Trust.
              </span>

            </h2>

            <p className="mt-6 text-slate-500 leading-7 max-w-xl">
              Construction is more than putting materials together.
              It is about creating spaces that people can depend on.
              Our approach combines planning, workmanship and communication.
            </p>

            {/* Reasons */}

            <div className="mt-9 grid sm:grid-cols-2 gap-6">

              {reasons.map((reason) => {

                const Icon = reason.icon;

                return (
                  <div
                    key={reason.title}
                    className="flex gap-4"
                  >

                    <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">

                      <Icon size={20} />

                    </div>

                    <div>

                      <h3 className="font-bold text-[#0F2D4A]">
                        {reason.title}
                      </h3>

                      <p className="text-sm text-slate-500 leading-6 mt-1">
                        {reason.description}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;