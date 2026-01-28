import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Zap, 
  Shield, 
  BarChart3,
  CheckCircle2,
  Sparkles,
  Globe
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Premium gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Funktioner
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Priser
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Om oss
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Logga in
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="premium" size="sm">
                  Kom igång
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-driven automatisering</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
            >
              Automatisera dina{" "}
              <span className="gradient-text">lead-uppföljningar</span>
              <br />
              med intelligent AI
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              readspond läser och svarar på leads automatiskt via Email, SMS och WhatsApp. 
              Boka möten utan att lyfta ett finger.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/login">
                <Button variant="premium" size="xl">
                  Starta gratis provperiod
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                Se demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Ingen kreditkort krävs
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                14 dagars gratis
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Avbryt när som helst
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="glass rounded-2xl p-2 glow">
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="h-8 bg-muted/50 flex items-center gap-2 px-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-warning/50" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                </div>
                <div className="p-8 bg-gradient-to-br from-card to-muted/30 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Din instrumentpanel väntar</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Allt du behöver för{" "}
              <span className="gradient-text">smartare uppföljningar</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              En komplett plattform för att automatisera hela din lead-hantering
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                title: "Email-automatisering",
                description: "Skicka personliga e-postmeddelanden baserat på lead-beteende och timing"
              },
              {
                icon: MessageSquare,
                title: "SMS & WhatsApp",
                description: "Nå leads direkt på deras mobil med intelligenta meddelanden"
              },
              {
                icon: Calendar,
                title: "Automatisk bokning",
                description: "Låt AI:n boka möten åt dig genom naturlig konversation"
              },
              {
                icon: Zap,
                title: "Blixtsnabb respons",
                description: "Svara på leads inom sekunder, 24/7, utan mänsklig insats"
              },
              {
                icon: Shield,
                title: "Säker & GDPR",
                description: "All data krypteras och hanteras enligt GDPR"
              },
              {
                icon: Globe,
                title: "Multi-språk",
                description: "Kommunicera med leads på deras eget språk automatiskt"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "98%", label: "Öppningsfrekvens" },
              { value: "3x", label: "Fler bokningar" },
              { value: "< 30s", label: "Genomsnittlig svarstid" },
              { value: "500+", label: "Nöjda kunder" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-glow opacity-30" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Redo att öka dina konverteringar?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Börja automatisera dina lead-uppföljningar idag och se resultaten redan imorgon.
              </p>
              <Link to="/login">
                <Button variant="premium" size="xl">
                  Starta din gratis provperiod
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Integritet</a>
              <a href="#" className="hover:text-foreground transition-colors">Villkor</a>
              <a href="#" className="hover:text-foreground transition-colors">Kontakt</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 readspond. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
