import { useRef, useState } from "react";

import GradeCard from "@/components/GradeCard";
import StudentForm from "@/components/StudentForm";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

interface Student {
  name: string;
  grade: number | null;
}

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [title, setTitle] = useState("Práctica de Matemáticas");
  const [subtitle, setSubtitle] = useState("Evaluación Semanal");
  const [logo, setLogo] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (!cardRef.current || students.length === 0) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const ratio = Math.min(
      (pdfWidth - 20) / imgWidth,
      (pdfHeight - 20) / imgHeight
    );
    
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;
    
    const x = (pdfWidth - finalWidth) / 2;
    const y = 10;

    pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
    pdf.save(`${title.replace(/\s+/g, "_")}_notas.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Generador de Notas
          </h1>
          <p className="text-muted-foreground">
            Agrega estudiantes y exporta las calificaciones en PDF
          </p>
        </motion.div>

        {/* Form */}
        <StudentForm
          onStudentsChange={setStudents}
          onTitleChange={setTitle}
          onSubtitleChange={setSubtitle}
          onLogoChange={setLogo}
          title={title}
          subtitle={subtitle}
          logo={logo}
        />

        {/* Export button */}
        {students.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <Button 
              onClick={exportToPDF} 
              size="lg" 
              className="gap-2 bg-navy hover:bg-navy/90 text-white shadow-lg"
            >
              <Download className="w-5 h-5" />
              Exportar a PDF
            </Button>
          </motion.div>
        )}

        {/* Preview */}
        {students.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4 justify-center">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">
                Vista previa del documento
              </span>
            </div>
            
            <div className="flex justify-center">
              <div ref={cardRef} className="bg-white p-6 rounded-lg">
                <GradeCard 
                  title={title}
                  subtitle={subtitle}
                  students={students}
                  logo={logo}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {students.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Agrega estudiantes para ver la vista previa</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
