"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "María González",
      role: "Emprendedora",
      content:
        "Kaizen me ayudó a establecer una rutina matutina que cambió completamente mi productividad. La filosofía de mejora continua realmente funciona.",
      rating: 5,
    },
    {
      name: "Carlos Ruiz",
      role: "Estudiante",
      content:
        "Después de probar muchas apps, esta es la única que realmente me motivó a mantener mis hábitos. Y es completamente gratis.",
      rating: 5,
    },
    {
      name: "Ana Martín",
      role: "Diseñadora",
      content:
        "Me encanta lo visual que es el progreso. Ver mi racha crecer día a día es increíblemente motivador. El diseño minimalista es perfecto.",
      rating: 5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  return (
    <section id="testimonios" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-green-900/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-muted-foreground">
            Personas que han adoptado la filosofía Kaizen para su crecimiento personal
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800">
                {/* Gradiente de fondo sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Borde superior con color */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <CardContent className="p-6 relative z-10">
                  <motion.div
                    className="flex mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-all duration-200 group-hover:fill-yellow-300 group-hover:text-yellow-300" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors duration-200">&ldquo;{testimonial.content}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{testimonial.name}</p>
                    <p className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">{testimonial.role}</p>
                  </div>
                </CardContent>
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Botón CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-xl cursor-pointer">
              Únete a Kaizen
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
