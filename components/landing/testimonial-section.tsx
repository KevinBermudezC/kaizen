"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

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
    <section id="testimonios" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Lo que dicen nuestros usuarios</h2>
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
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group bg-background">
                <CardContent className="p-6">
                  <motion.div
                    className="flex mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </motion.div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
