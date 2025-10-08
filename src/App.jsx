import { motion } from "framer-motion";
import me from "./assets/me.png";

export default function App() {
  return (
    <div className="container">
      <section className="hero">
        {/* LEFT: text */}
        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className="kicker">
            <span>Available for shoots</span>
            <span aria-hidden>•</span>
            <span>Perth & Remote</span>
          </span>

          <h1>
            I’m <span style={{ color: "var(--ring)" }}>Arpit Prajapati</span>,<br />
            a Portrait & Cinematic Photographer
          </h1>

          <p className="sub">
            I craft moody, story-driven visuals — blending practical lighting with
            subtle color to make subjects feel cinematic and alive. Let’s turn your
            moments into frames you’ll never forget.
          </p>

          <div className="cta-row">
            <a className="btn primary" href="mailto:you@example.com">Book a Session</a>
            <a className="btn" href="#work">View Selected Work</a>
          </div>
        </motion.div>

        {/* RIGHT: glowing round portrait */}
        <motion.div
          className="portrait-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="portrait" role="img" aria-label="Photographer portrait">
            {/* Put your transparent PNG in /public/me.png */}
            <img src={me} alt="Portrait" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
