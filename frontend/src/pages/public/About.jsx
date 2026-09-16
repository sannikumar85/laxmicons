import { Link } from "react-router-dom";
import { FiCheckCircle, FiCompass, FiUsers } from "react-icons/fi";

export default function About() {
  const pillars = [
    [FiCheckCircle, "Quality-led work", "Clear planning, careful execution and practical communication at every stage."],
    [FiCompass, "Local expertise", "A Bihar-focused team that understands local requirements and delivery realities."],
    [FiUsers, "People first", "We build long-term relationships with clients, workers and project partners."],
  ];
  return <div className="bg-slate-50"><section className="bg-[#102A43] px-4 pb-20 pt-36 text-white sm:px-6"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[.2em] text-orange-400">About Laxmi Construction</p><h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-6xl">Building trust into every project.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">We help families, businesses and project owners turn plans into dependable spaces through construction, consultancy, renovation and skilled labour solutions.</p></div></section><section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3">{pillars.map(([Icon, title, text]) => <article key={title} className="rounded-2xl bg-white p-7 shadow-sm"><Icon className="text-orange-500" size={28}/><h2 className="mt-5 text-xl font-bold text-[#102A43]">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</section><div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6"><Link to="/contact" className="inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white">Talk to our team</Link></div></div>;
}