"use client"

import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-50 via-blue-50/40 to-green-50/40 dark:from-slate-900 dark:via-blue-900/30 dark:to-green-900/30">
      <motion.div
        className="container mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          ¿Listo para tu mejora continua?
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Únete a la filosofía Kaizen con esta herramienta completamente gratuita y de código abierto. Comienza tu
          transformación personal hoy mismo.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -3 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
          >
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-xl cursor-pointer">
                Comenzar Gratis
              </Button>
            </Link>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -3 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
          >
            <a 
              href="https://github.com/KevinBermudezC/kaizen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:shadow-xl dark:hover:bg-primary/80 dark:hover:text-primary-foreground dark:border-primary cursor-pointer">
                <Github className="mr-2 h-5 w-5" />
                Ver en GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          100% Gratuito • Código Abierto • Proyecto de Portfolio
        </motion.p>
      </motion.div>
    </section>
  )
}
