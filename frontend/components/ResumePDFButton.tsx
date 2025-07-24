"use client"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ResumePDF from "./ResumePDF"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const ResumePDFButton = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<ResumePDF data={data} />}
      fileName="CV.pdf"
    >
      {({ loading, url, error }) => {
        if (error) {
          console.error("❌ Erro ao gerar PDF:", error)
        }

        return loading ? (
          <Button
            size="lg"
            variant="outline"
            className="border-teal-500 text-teal-400 hover:bg-teal-500/10 bg-transparent"
          >
            Gerando PDF...
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            className="border-teal-500 text-teal-400 hover:bg-teal-500/10 bg-transparent"
          >
            <FileText className="mr-2 h-5 w-5" />
            Baixar Currículo
          </Button>
        )
      }}
    </PDFDownloadLink>
  )
}

export default ResumePDFButton
