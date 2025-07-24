"use client"
import ResumePDFButton from "@/components/ResumePDFButton"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Github, Linkedin, FileText, ExternalLink, Code, MessageSquare, MapPin, Calendar } from "lucide-react"
import Image from "next/image"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

const [projects, setProjects] = useState([])
useEffect(() => {
  fetch(`${apiUrl}/api/projects/`)
    .then(res => res.json())
    .then(data => setProjects(data))
}, [])

const [skills, setSkills] = useState([])
useEffect(() => {
  fetch(`${apiUrl}/api/skills/`)
    .then(res => res.json())
    .then(data => setSkills(data))
}, [])

const [education, setEducation] = useState([])
useEffect(() => {
  fetch(`${apiUrl}/api/educations/`)
    .then(res => res.json())
    .then(data => setEducation(data))
}, [])


const [about, setAbout] = useState(null)
useEffect(() => {
  fetch(`${apiUrl}/api/about/`)
    .then(res => res.json())
    .then(data => setAbout(data[0]))
}, [])

const resumeData = {
  about,
  education,
  skills,
  projects
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 text-white transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-teal-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            MaxForceDev
          </h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-teal-400 transition-colors">
              Início
            </a>
            <a href="#about" className="hover:text-teal-400 transition-colors">
              Sobre
            </a>
            <a href="#skills" className="hover:text-teal-400 transition-colors">
              Skills
            </a>
            <a href="#education" className="hover:text-teal-400 transition-colors">
              Formação
            </a>
            <a href="#projects" className="hover:text-teal-400 transition-colors">
              Projetos
            </a>
            <a href="#contact" className="hover:text-teal-400 transition-colors">
              Contato
            </a>
          </nav>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-teal-500/20">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {about?.name}
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">{about?.job_title}</p>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">{about?.bio}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Array.from(
                new Set(
                  projects.flatMap((project) => project.tags || []).map((tag) => tag.trim())
                )
              ).sort().map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors px-4 py-2 text-sm"
                >
                  {tech}
                </Badge>
              ))}

            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {about?.phone && (
                <a
                  href={`https://wa.me/55${about.phone.replace(/\D/g, '')}`} // Remove traços e espaços
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Fale no WhatsApp
                  </Button>
                </a>
              )}

               {about?.name && education?.length > 0 && skills?.length > 0 && projects?.length > 0 && (
                  <ResumePDFButton data={resumeData} />
                )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-slate-800/50 dark:bg-slate-900/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Sobre Mim
          </h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative w-64 h-64 mx-auto mb-8 md:mb-0">
                <Image
                  src={about?.photo || ""}
                  alt=""
                  width={256}
                  height={256}
                  className="rounded-full object-cover border-4 border-teal-500/30"
                />

                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/20 to-emerald-500/20"></div>
              </div>
            </div>
            <div>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">{about?.bio_about}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center text-slate-400">
                  <MapPin className="mr-2 h-4 w-4 text-teal-400" />
                  {about?.localization}
                </div>
                <div className="flex items-center text-slate-400">
                  <Calendar className="mr-2 h-4 w-4 text-teal-400" />
                  {about?.year_experience}+ anos de experiência
                </div>
              </div>

              <div className="flex gap-4">
                {about?.github && (
                  <a href={about.github} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-500 text-teal-400 hover:bg-teal-500/10 bg-transparent"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </a>
                )}

                {about?.linkedin && (
                  <a href={about.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-500 text-teal-400 hover:bg-teal-500/10 bg-transparent"
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Habilidades
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-slate-300">{skill.name}</span>
                    <span className="text-sm text-teal-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-slate-800/50 dark:bg-slate-900/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Projetos
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-slate-800/80 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 group"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || ""}

                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-100 group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-teal-500/20 text-teal-300 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-teal-500 text-teal-400 hover:bg-teal-500/10 flex-1 bg-transparent"
                        >
                          <Code className="mr-2 h-4 w-4" />
                          Código
                        </Button>
                      </a>
                    )}

                    {project.demo_link && (
                      <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 flex-1"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      </a>
                    )}
                    {!project.github_link && !project.demo_link && (
                      <div
                        className="col-span-2 flex-1 text-sm text-center px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium select-none cursor-not-allowed flex items-center justify-center"
                        style={{ minWidth: "11.5rem" }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4 opacity-50" />
                        Links Em breve
                      </div>
                    )}
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 bg-slate-800/50 dark:bg-slate-900/50">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Formação & Cursos
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {education.map((item) => (
                <Card
                  key={item.id}
                  className="bg-slate-800/80 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
                >
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className={`${
                            item.type === "Graduação"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : item.type === "Certificação"
                                ? "bg-purple-500/20 text-purple-300"
                                : "bg-teal-500/20 text-teal-300"
                          }`}
                        >
                          {item.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${
                            item.status === "Concluído" || item.status === "Certificado"
                              ? "border-green-500 text-green-400"
                              : "border-yellow-500 text-yellow-400"
                          } bg-transparent`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-slate-400">{item.period}</span>
                    </div>
                    <CardTitle className="text-xl text-slate-100 mt-2">{item.title}</CardTitle>
                    <div className="flex items-center text-teal-400 text-sm">
                      <span>{item.institution}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 leading-relaxed">{item.description}</p>

                    {/* Adicionar botão de certificado apenas para cursos concluídos/certificados */}
                    {(item.status === "Certificado" || item.status === "Concluído") && (
                      <div className="flex justify-end">
                        <a href={`${apiUrl}${item.certification}`} target="_blank" download rel="noopener noreferrer">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-teal-500 text-teal-400 hover:bg-teal-500/10 bg-transparent"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Ver Certificado
                          </Button>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="py-12 px-4 bg-slate-900/90 dark:bg-slate-950/90 border-t border-teal-500/20 mt-10"
      >
        <div className="container mx-auto text-center space-y-6">
          <h4 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Vamos Trabalhar Juntos?
          </h4>

          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Estou sempre aberto a novos desafios e oportunidades interessantes. Fale comigo no WhatsApp ou acesse minhas redes abaixo.
          </p>

          {about?.phone && (
            <a
              href={`https://wa.me/55${about.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
              >
                Fale no WhatsApp
              </Button>
            </a>
          )}

          <div className="flex justify-center gap-4 mt-6">
            {about?.github && (
              <a href={about.github} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-teal-500 text-teal-400 hover:bg-teal-500/10"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </a>
            )}

            {about?.linkedin && (
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-teal-500 text-teal-400 hover:bg-teal-500/10"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
              </a>
            )}
          </div>

          <div className="border-t border-slate-700 pt-6 text-slate-500 text-sm">
            © {new Date().getFullYear()} {about?.name || 'Luis Felipe'}. Todos os direitos reservados.
          </div>
        </div>
      </footer>

    </div>
  )
}
