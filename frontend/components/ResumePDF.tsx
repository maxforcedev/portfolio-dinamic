"use client"

import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer"



const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: "#2C5F5D", // Azul petróleo
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    fontSize: 10,
    color: "#666",
  },
  contactItem: {
    marginBottom: 3,
    marginRight: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#00FF88", // Verde neon
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  subheading: {
    fontSize: 14,
    fontWeight: 600,
    color: "#444",
    marginBottom: 5,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.4,
    marginBottom: 3,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 2,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00FF88", // Verde neon
    marginRight: 5,
    marginTop: 3,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tag: {
    fontSize: 9,
    backgroundColor: "#2C5F5D", 
    color: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  link: {
    color: "#2C5F5D",
    textDecoration: "underline",
    fontSize: 11,
  },
})

const ResumePDF = ({ data }) => {
  const aboutData = data.about || null
  const projectsData = Array.isArray(data.projects) ? data.projects : data.projects ? [data.projects] : []
  const educationData = Array.isArray(data.education) ? data.education : data.education ? [data.education] : []
  const skillsData = Array.isArray(data.skills) ? data.skills : data.skills ? [data.skills] : []
  /* const experienceData = data.experience || [] */

  if (!aboutData) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>Dados insuficientes para gerar o currículo.</Text>
        </Page>
      </Document>
    )
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Dados Pessoais */}
        <View style={styles.header}>
          <Text style={styles.name}>{aboutData?.name}</Text>
          <Text style={styles.jobTitle}>{aboutData?.job_title}</Text>
          <View style={styles.contactInfo}>
            {aboutData?.localization && <Text style={styles.contactItem}>{aboutData.localization}</Text>}
            {aboutData?.phone && <Text style={styles.contactItem}>{aboutData.phone}</Text>}
            {aboutData?.email && <Text style={styles.contactItem}>{aboutData.email}</Text>}
            {aboutData?.github && (
              <Link src={aboutData.github} style={styles.contactItem}>
                GitHub: {aboutData.github.replace("https://", "")}
              </Link>
            )}
            {aboutData?.linkedin && (
              <Link src={aboutData.linkedin} style={styles.contactItem}>
                LinkedIn: {aboutData.linkedin.replace("https://", "")}
              </Link>
            )}
          </View>
        </View>

        {/* Resumo / Bio */}
        {aboutData?.bio_about && ( // Usando bio_about conforme seus dados da API
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo</Text>
            <Text style={styles.text}>{aboutData.bio_about}</Text>
          </View>
        )}

        {/* Experiência Profissional (Comentado, pois não será usado agora) */}
        {/* {experienceData && experienceData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            {experienceData.map((job) => (
              <View key={job.id} style={{ marginBottom: 15 }}>
                <Text style={styles.subheading}>{job.title}</Text>
                <Text style={styles.text}>
                  {job.company} • {job.period}
                </Text>
                {job.description &&
                  job.description.map((desc, idx) => (
                    <View key={idx} style={styles.listItemContainer}>
                      <View style={styles.bullet} />
                      <Text style={styles.listItem}>{desc}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        )} */}

        {/* Formação Acadêmica */}
        {educationData && educationData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formação Acadêmica & Cursos</Text>
            {educationData.map((item) => (
              <View key={item.id} style={{ marginBottom: 10 }}>
                <Text style={styles.subheading}>{item.title}</Text>
                <Text style={styles.text}>
                  {item.institution} • {item.period} • {item.status}
                </Text>
                {item.description && <Text style={styles.text}>{item.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Habilidades */}
        {skillsData && skillsData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {skillsData.map((skill, index) => (
                <Text key={index} style={[styles.tag, { backgroundColor: "#0f766e" }]}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projetos */}
        {projectsData && projectsData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projetos</Text>
            {projectsData.map((project) => (
              <View key={project.id} style={{ marginBottom: 15 }}>
                <Text style={styles.subheading}>{project.title}</Text>
                {/* Descrição do projeto removida conforme solicitado */}
                {project.tags && project.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {project.tags.map((tag, idx) => (
                      <Text key={idx} style={styles.tag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                )}
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  {project.demo_link && (
                    <Link src={project.demo_link} style={[styles.link, { marginRight: 10 }]}>
                      Demo
                    </Link>
                  )}
                  {project.github_link && (
                    <Link src={project.github_link} style={styles.link}>
                      Código
                    </Link>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}

export default ResumePDF
