"use client"

import { motion } from "framer-motion"
import { Github, Heart, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="bg-gradient-to-br from-slate-100 via-blue-100/30 to-green-100/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-green-900/20 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white font-bold text-lg">改</span>
              </div>
              <span className="font-bold text-xl text-foreground">Kaizen</span>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-4">
              Mejora continua a través de hábitos simples. Completamente gratuito y de código abierto.
            </p>
            <motion.a
              href="https://github.com/KevinBermudezC/kaizen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105"
              whileHover={{ x: 5 }}
            >
              <Github className="h-4 w-4" />
              <span>Ver en GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </motion.a>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Producto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <motion.a href="#funciones" className="hover:text-primary transition-all duration-200 hover:scale-105 inline-block" whileHover={{ x: 5 }}>
                  Funciones
                </motion.a>
              </li>
              <li>
                <motion.a href="#testimonios" className="hover:text-primary transition-all duration-200 hover:scale-105 inline-block" whileHover={{ x: 5 }}>
                  Testimonios
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="https://github.com/KevinBermudezC/kaizen/projects" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-200 hover:scale-105 flex items-center gap-1 cursor-pointer" 
                  whileHover={{ x: 5 }}
                >
                  Roadmap
                  <ExternalLink className="h-3 w-3" />
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Comunidad</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <motion.a 
                  href="https://github.com/KevinBermudezC/kaizen/blob/master/CONTRIBUTING.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-200 hover:scale-105  flex items-center gap-1" 
                  whileHover={{ x: 5 }}
                >
                  Contribuir
                  <ExternalLink className="h-3 w-3" />
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="https://github.com/KevinBermudezC/kaizen/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-200 hover:scale-105  flex items-center gap-1" 
                  whileHover={{ x: 5 }}
                >
                  Reportar Bug
                  <ExternalLink className="h-3 w-3" />
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="https://github.com/KevinBermudezC/kaizen/discussions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-200 hover:scale-105 flex items-center gap-1" 
                  whileHover={{ x: 5 }}
                >
                  Discusiones
                  <ExternalLink className="h-3 w-3" />
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <motion.a 
                  href="https://github.com/KevinBermudezC/kaizen/blob/master/README.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-200 hover:scale-105  flex items-center gap-1" 
                  whileHover={{ x: 5 }}
                >
                  Documentación
                  <ExternalLink className="h-3 w-3" />
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="https://es.wikipedia.org/wiki/Kaizen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-200 hover:scale-105  flex items-center gap-1" 
                  whileHover={{ x: 5 }}
                >
                  Filosofía Kaizen
                  <ExternalLink className="h-3 w-3" />
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="https://github.com/KevinBermudezC/kaizen/blob/master/CHANGELOG.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-200 hover:scale-105  flex items-center gap-1" 
                  whileHover={{ x: 5 }}
                >
                  Changelog
                  <ExternalLink className="h-3 w-3" />
                </motion.a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p>&copy; {new Date().getFullYear()} Kaizen. Proyecto de código abierto.</p>
            <div className="flex items-center space-x-1">
              <span>Hecho con</span>
              <Heart className="h-3 w-3 fill-orange-500 text-orange-500" />
              <span>para la comunidad</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
