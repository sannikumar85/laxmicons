const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Home Owner",
    text: "The planning and communication throughout the project made the entire construction process much easier.",
  },
  {
    name: "Amit Sharma",
    role: "Business Owner",
    text: "Professional approach, clear communication and good attention to the quality of work.",
  },
  {
    name: "Priya Singh",
    role: "Home Owner",
    text: "We wanted a modern and practical home, and the team understood our requirements very well.",
  },
];

function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-orange-500 text-sm font-bold tracking-[0.2em] uppercase mb-3">
            Client Stories
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2D4A]">
            What Our Clients Say
          </h2>

          <p className="text-slate-500 mt-4 leading-7">
            Real experiences from people who trusted us with their projects.
          </p>

        </div>

        {/* ================= TESTIMONIAL CARDS ================= */}

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {testimonials.map((testimonial) => (

            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-7 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Stars */}

              <div className="text-orange-500 tracking-widest text-sm">
                ★★★★★
              </div>

              <p className="text-slate-600 leading-7 mt-5 text-sm">
                “{testimonial.text}”
              </p>

              <div className="mt-7 pt-5 border-t border-slate-100">

                <p className="font-bold text-[#0F2D4A]">
                  {testimonial.name}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {testimonial.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;