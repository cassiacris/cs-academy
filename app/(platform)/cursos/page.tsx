import Link from 'next/link'
import { BookOpen, Clock, Play, Download, FileText, Table2, Sparkles, Music, Brain } from 'lucide-react'
import { mockCourses, mockMeditations, mockTools } from '@/lib/mock-data'
import CourseCard from '@/components/cursos/CourseCard'
import { formatDuration } from '@/lib/utils'
import { Course, CourseCategory } from '@/types'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  template: <FileText className="w-5 h-5 text-cs-gold" />,
  planilha: <Table2 className="w-5 h-5 text-cs-gold" />,
  prompt: <Sparkles className="w-5 h-5 text-cs-gold" />,
  ebook: <BookOpen className="w-5 h-5 text-cs-gold" />,
}

function ToolCard({ course }: { course: Course }) {
  const icon = PRODUCT_ICONS[course.product_type || 'template']

  return (
    <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden hover:border-cs-gold/30 transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      <div
        className="h-28 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #141414 0%, #1A1A0A 100%)' }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(201, 164, 53, 0.1)', border: '1px solid rgba(201, 164, 53, 0.2)' }}
        >
          {icon}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-cs-gold font-semibold uppercase tracking-wider mb-1 capitalize">
          {course.product_type}
        </p>
        <h3 className="text-sm font-bold text-cs-white mb-2 leading-snug">{course.title}</h3>
        <p className="text-xs text-cs-white-muted leading-relaxed line-clamp-2 flex-1">{course.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-base font-bold text-cs-white">{course.price}</span>
          <a
            href={course.purchase_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-cs-gold hover:bg-cs-gold-hover text-cs-black text-xs font-bold px-3 py-2 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Comprar
          </a>
        </div>
      </div>
    </div>
  )
}

function MeditationCard({ course }: { course: Course }) {
  return (
    <Link href={`/cursos/${course.slug}`} className="block group">
      <div className="bg-cs-black-surface border border-cs-border rounded-xl overflow-hidden hover:border-cs-gold/30 transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
        <div
          className="h-28 flex items-center justify-center relative"
          style={{ background: 'linear-gradient(135deg, #0A0A1A 0%, #1A1020 100%)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(201, 164, 53, 0.1)', border: '1px solid rgba(201, 164, 53, 0.2)' }}
          >
            <Music className="w-6 h-6 text-cs-gold" />
          </div>
          <span className="absolute top-3 right-3 text-xs font-semibold text-cs-gold border border-cs-gold/30 bg-cs-gold-dim px-2 py-0.5 rounded-full">
            Grátis
          </span>
        </div>
        <div className="p-4">
          <p className="text-xs text-cs-white-dim mb-1">Meditação guiada</p>
          <h3 className="text-sm font-bold text-cs-white mb-2 group-hover:text-cs-gold transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-cs-white-muted leading-relaxed line-clamp-2">{course.description}</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-cs-gold font-medium">
            <Play className="w-3.5 h-3.5 fill-current" />
            {formatDuration(course.total_duration)}
          </div>
        </div>
      </div>
    </Link>
  )
}

async function fetchProductsFromDB(): Promise<Course[] | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) return null

    const supabase = createSupabaseAdmin(supabaseUrl, serviceKey)
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('category', { ascending: true })

    if (error || !data || data.length === 0) return null
    return data as Course[]
  } catch {
    return null
  }
}

export default async function CursosPage() {
  const dbProducts = await fetchProductsFromDB()

  // Use DB data if available, otherwise fall back to mock data
  const allCourses = dbProducts
    ? dbProducts.filter((p) => p.product_type === 'curso')
    : mockCourses
  const allMeditations = dbProducts
    ? dbProducts.filter((p) => p.product_type === 'meditacao')
    : mockMeditations
  const allTools = dbProducts
    ? dbProducts.filter((p) =>
        p.product_type && ['template', 'planilha', 'prompt', 'ebook'].includes(p.product_type)
      )
    : mockTools

  const sections = [
    {
      id: 'mentalidade' as CourseCategory,
      title: 'Mentalidade',
      description: 'Reprogramações, meditações e ferramentas para transformar sua mente de dentro para fora.',
      icon: <Brain className="w-5 h-5 text-cs-gold" />,
      courses: allCourses.filter((c) => c.category === 'mentalidade'),
      meditations: allMeditations.filter((m) => !m.category || m.category === 'mentalidade'),
    },
    {
      id: 'negocios-femininos' as CourseCategory,
      title: 'Negócios Femininos',
      description: 'Posicionamento estratégico, mentalidade de alto valor e construção de autoridade real.',
      icon: <Sparkles className="w-5 h-5 text-cs-gold" />,
      courses: allCourses.filter((c) => c.category === 'negocios-femininos'),
      meditations: [],
    },
    {
      id: 'solucoes-ferramentas' as CourseCategory,
      title: 'Soluções e Ferramentas',
      description: 'Templates, planilhas e prompts prontos para usar no seu negócio agora.',
      icon: <FileText className="w-5 h-5 text-cs-gold" />,
      courses: [],
      meditations: [],
      tools: allTools.filter((t) => t.category === 'solucoes-ferramentas'),
    },
  ]

  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-cs-white">Biblioteca CS Academy</h1>
        <p className="text-sm text-cs-white-muted mt-1">
          Todo o conteúdo em um só lugar — organizado para a sua jornada.
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="space-y-5">
          {/* Section header */}
          <div className="flex items-center gap-3 pb-3 border-b border-cs-border">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201, 164, 53, 0.1)', border: '1px solid rgba(201, 164, 53, 0.2)' }}
            >
              {section.icon}
            </div>
            <div>
              <h2 className="text-base font-bold text-cs-white">{section.title}</h2>
              <p className="text-xs text-cs-white-muted">{section.description}</p>
            </div>
          </div>

          {/* Courses */}
          {section.courses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {section.courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          {/* Meditations */}
          {section.meditations && section.meditations.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {section.meditations.map((m) => (
                <MeditationCard key={m.id} course={m} />
              ))}
            </div>
          )}

          {/* Tools */}
          {section.tools && section.tools.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {section.tools.map((tool) => (
                <ToolCard key={tool.id} course={tool} />
              ))}
            </div>
          )}
        </div>
      ))}

      {/* RECODE banner */}
      <div
        className="rounded-xl border p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        style={{
          background: 'linear-gradient(135deg, #141414 0%, #1A0A1A 100%)',
          borderColor: 'rgba(201, 164, 53, 0.15)',
        }}
      >
        <div className="w-12 h-12 rounded-xl bg-cs-gold-dim border border-cs-gold/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">✦</span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-base font-semibold text-cs-white">Protocolo RECODE — Transformação Profunda</h3>
          <p className="text-sm text-cs-white-muted mt-1">
            8 a 12 sessões individuais de Hipnoterapia e Análise com a Cássia. Reprogramação completa da mente e do emocional.
          </p>
        </div>
        <a
          href="https://wa.me/5548999888464"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cs-gold text-cs-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-cs-gold-hover transition-colors whitespace-nowrap flex-shrink-0"
        >
          Quero saber mais
        </a>
      </div>
    </div>
  )
}
