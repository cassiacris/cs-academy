import { Course, Module, FeedPost, Material } from '@/types'

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'box-magnetize',
    title: 'Box Magnetize',
    description:
      '4 reprogramações mentais guiadas temáticas para transformar sua autoimagem, vendas, relação com dinheiro e posicionamento. Uma experiência sonora de transformação profunda.',
    thumbnail_url: '',
    total_lessons: 8,
    total_duration: 160,
    progress: 25,
    has_free_preview: true,
    purchase_url: 'https://pay.hotmart.com/box-magnetize',
    price: 'R$ 97',
    modules: [
      {
        id: 'm1',
        course_id: '1',
        title: 'Módulo 1 — Autoimagem',
        order: 1,
        lessons: [
          {
            id: 'l1',
            module_id: 'm1',
            title: 'Reprogramação: Autoimagem de Alta Performance',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 22,
            order: 1,
            description:
              'Uma reprogramação mental profunda para você se ver como a mulher de alto valor que já é. Nesta sessão guiada, vamos trabalhar as camadas mais profundas da sua autoimagem e criar novas referências internas.',
            completed: true,
            is_free: true,
          },
          {
            id: 'l2',
            module_id: 'm1',
            title: 'Âncora de Identidade — Ritual de Ativação',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 18,
            order: 2,
            description:
              'Ritual de ativação para reforçar sua nova identidade no cotidiano. Use sempre que precisar se reconectar com sua essência.',
            completed: false,
          },
        ],
      },
      {
        id: 'm2',
        course_id: '1',
        title: 'Módulo 2 — Vendas',
        order: 2,
        lessons: [
          {
            id: 'l3',
            module_id: 'm2',
            title: 'Reprogramação: Vender sem Esforço',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 25,
            order: 1,
            description:
              'Quebre as crenças que bloqueiam sua capacidade de vender com naturalidade e autoridade. Reprogramação para tornar vendas um ato de serviço, não de convencimento.',
            completed: false,
            is_free: true,
          },
          {
            id: 'l4',
            module_id: 'm2',
            title: 'A Mentalidade da Especialista que É Paga para Existir',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 20,
            order: 2,
            description:
              'Você não vende quando tenta. Você vende quando é. Nesta reprogramação, vamos instalar a identidade de quem é procurada, não de quem precisa convencer.',
            completed: false,
          },
        ],
      },
      {
        id: 'm3',
        course_id: '1',
        title: 'Módulo 3 — Dinheiro',
        order: 3,
        lessons: [
          {
            id: 'l5',
            module_id: 'm3',
            title: 'Reprogramação: Nova Relação com Dinheiro',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 28,
            order: 1,
            description:
              'Trabalho profundo com as lealdades familiares e crenças herdadas sobre dinheiro. Porque às vezes, não é sua história financeira — é a da sua família que você está repetindo.',
            completed: false,
          },
          {
            id: 'l6',
            module_id: 'm3',
            title: 'Frequência de Abundância — Programação Subconsciente',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 22,
            order: 2,
            description:
              'Sessão noturna de reprogramação para sintonizar seu subconsciente com a frequência da abundância enquanto você dorme.',
            completed: false,
          },
        ],
      },
      {
        id: 'm4',
        course_id: '1',
        title: 'Módulo 4 — Posicionamento de Alto Valor',
        order: 4,
        lessons: [
          {
            id: 'l7',
            module_id: 'm4',
            title: 'Reprogramação: A Especialista de Alto Valor',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 24,
            order: 1,
            description:
              'Para se posicionar no mercado como referência de alto valor, primeiro você precisa acreditar que você é isso. Esta reprogramação trabalha exatamente essa instalação.',
            completed: false,
          },
          {
            id: 'l8',
            module_id: 'm4',
            title: 'Consolidação: Território Mental Exclusivo',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 21,
            order: 2,
            description:
              'Sessão de consolidação e integração de todas as reprogramações anteriores. Seu território mental exclusivo — o lugar de onde nenhuma comparação te tira.',
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'metodo-pav',
    title: 'Método PAV',
    description:
      'Curso completo com mentalidade, posicionamento estratégico, perfil que converte no Instagram e funil de atração essencialista. Para a profissional que quer ser reconhecida pelo que realmente vale.',
    thumbnail_url: '',
    total_lessons: 14,
    total_duration: 420,
    progress: 0,
    has_free_preview: true,
    purchase_url: 'https://pay.hotmart.com/metodo-pav',
    price: 'R$ 997',
    modules: [
      {
        id: 'm5',
        course_id: '2',
        title: 'Módulo 1 — Fundamentos do PAV',
        order: 1,
        lessons: [
          {
            id: 'l9',
            module_id: 'm5',
            title: 'O que é Posicionamento de Alto Valor de Verdade',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 35,
            order: 1,
            description:
              'A diferença entre posicionamento de fachada e posicionamento real. Por que a maioria das profissionais está invisível mesmo trabalhando muito — e como mudar isso.',
            completed: false,
            is_free: true,
          },
          {
            id: 'l10',
            module_id: 'm5',
            title: 'Os 3 Erros que Destroem o Posicionamento',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 28,
            order: 2,
            description:
              'Erros silenciosos que fazem você trabalhar mais e ganhar menos. Identificar é o primeiro passo para corrigir.',
            completed: false,
          },
          {
            id: 'l11',
            module_id: 'm5',
            title: 'O Método EVA — Essência, Valor e Autoimagem',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 40,
            order: 3,
            description:
              'A base metodológica do PAV. Como alinhar sua essência, seu valor percebido e sua autoimagem para criar um posicionamento que dura.',
            completed: false,
          },
        ],
      },
      {
        id: 'm6',
        course_id: '2',
        title: 'Módulo 2 — Mentalidade de Alto Valor',
        order: 2,
        lessons: [
          {
            id: 'l12',
            module_id: 'm6',
            title: 'Metas Invisíveis: O que Realmente te Sabota',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 38,
            order: 1,
            description:
              'As metas que você não vê — lealdades familiares, sabotagens inconscientes e padrões herdados que interferem diretamente nos seus resultados.',
            completed: false,
          },
          {
            id: 'l13',
            module_id: 'm6',
            title: 'Primeiro Você, Depois o Mundo',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 32,
            order: 2,
            description:
              'Por que o trabalho interno precede qualquer estratégia externa. A sequência correta para construir autoridade real e duradoura.',
            completed: false,
          },
        ],
      },
      {
        id: 'm7',
        course_id: '2',
        title: 'Módulo 3 — Posicionamento Estratégico',
        order: 3,
        lessons: [
          {
            id: 'l14',
            module_id: 'm7',
            title: 'Seu Território Mental Exclusivo',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 42,
            order: 1,
            description:
              'Como definir e comunicar aquilo que só você faz do jeito que você faz. Seu diferencial não é o que você oferece — é quem você é enquanto oferece.',
            completed: false,
          },
          {
            id: 'l15',
            module_id: 'm7',
            title: 'Precificação de Alto Valor — A Lógica que Liberta',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 45,
            order: 2,
            description:
              'Como precificar de forma que reflita seu valor real — sem culpa, sem medo e sem pedir desconto para si mesma.',
            completed: false,
          },
          {
            id: 'l16',
            module_id: 'm7',
            title: 'As Rotas da Vida — Oferta Certa, Momento Certo',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 35,
            order: 3,
            description:
              'Como mapear as rotas de vida da sua cliente ideal e criar ofertas que chegam no momento em que ela está pronta para comprar.',
            completed: false,
          },
        ],
      },
      {
        id: 'm8',
        course_id: '2',
        title: 'Módulo 4 — Perfil que Converte',
        order: 4,
        lessons: [
          {
            id: 'l17',
            module_id: 'm8',
            title: 'Instagram como Vitrine de Autoridade',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 48,
            order: 1,
            description:
              'Cada elemento do seu perfil comunica algo. Vamos fazer com que cada detalhe comunique exatamente o que precisa comunicar para atrair a cliente certa.',
            completed: false,
          },
          {
            id: 'l18',
            module_id: 'm8',
            title: 'Conteúdo que Posiciona — Não que Entretém',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 38,
            order: 2,
            description:
              'A diferença entre criar conteúdo para engajamento e criar conteúdo para posicionamento. Como ser lembrada pelas razões certas.',
            completed: false,
          },
        ],
      },
      {
        id: 'm9',
        course_id: '2',
        title: 'Módulo 5 — Funil de Atração Essencialista',
        order: 5,
        lessons: [
          {
            id: 'l19',
            module_id: 'm9',
            title: 'O Funil que Atrai sem Perseguir',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 45,
            order: 1,
            description:
              'Como construir um sistema de atração que trabalha enquanto você não está. Sem scripts agressivos, sem energia de desespero.',
            completed: false,
          },
          {
            id: 'l20',
            module_id: 'm9',
            title: 'Fechamento com Elegância — A Venda de Alto Valor',
            youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            duration_minutes: 40,
            order: 2,
            description:
              'Como fechar vendas altas sem pressão, sem objeção e com a cliente convencida de que você é exatamente o que ela precisava.',
            completed: false,
          },
        ],
      },
    ],
  },
]

export const mockFeedPosts: FeedPost[] = [
  {
    id: 'p1',
    content:
      'Quero te falar uma coisa que pouquíssimas pessoas têm coragem de admitir:\n\nO problema não é falta de estratégia.\nO problema é que você não acredita que merece o que quer.\n\nE enquanto você não resolver isso, qualquer estratégia vai colapsar no meio do caminho.\n\nPrimeiro você. Depois o mundo. ✦',
    created_at: '2026-03-25T10:00:00Z',
    author_name: 'Cássia Souza',
    likes_count: 47,
    liked_by_user: false,
    comments: [
      {
        id: 'c1',
        post_id: 'p1',
        user_id: 'u2',
        content: 'Isso me atingiu fundo. Exatamente onde eu estava travada. Obrigada, Cássia!',
        created_at: '2026-03-25T11:30:00Z',
        user_name: 'Ana Paula',
      },
      {
        id: 'c2',
        post_id: 'p1',
        user_id: 'u3',
        content:
          'Cada vez que leio isso, ressoa diferente. Hoje ressou mais forte que nunca.',
        created_at: '2026-03-25T14:15:00Z',
        user_name: 'Fernanda M.',
      },
    ],
  },
  {
    id: 'p2',
    content:
      'Lembrete para a semana:\n\nVocê não precisa ser perfeita para cobrar caro.\nVocê precisa ser a melhor para aquela pessoa específica.\n\nE para ser isso, você precisa se ver assim primeiro.\n\nA autoimagem é anterior a qualquer resultado. Sempre.',
    created_at: '2026-03-24T08:30:00Z',
    author_name: 'Cássia Souza',
    likes_count: 63,
    liked_by_user: true,
    comments: [
      {
        id: 'c3',
        post_id: 'p2',
        user_id: 'u4',
        content: 'Salvei isso. Vou ler toda manhã.',
        created_at: '2026-03-24T09:00:00Z',
        user_name: 'Mariana S.',
      },
    ],
  },
  {
    id: 'p3',
    content:
      'Uma cliente me disse na sessão de ontem:\n\n"Eu sabia tudo que você me disse. Mas eu precisava que alguém olhasse pra mim e dissesse que era verdade."\n\nIsso é o que faço.\nNão ensino o que você não sabe.\nEu valido o que você ainda tem medo de acreditar sobre si mesma.\n\nÀs vezes é isso que muda tudo.',
    image_url: '',
    created_at: '2026-03-22T15:00:00Z',
    author_name: 'Cássia Souza',
    likes_count: 89,
    liked_by_user: false,
    comments: [],
  },
]

export const mockMaterials: Material[] = [
  {
    id: 'mat1',
    title: 'Workbook — Identidade de Alto Valor',
    description:
      'Exercícios práticos para mapear e fortalecer sua identidade profissional. 24 páginas de reflexões e ativações.',
    category: 'Mentalidade',
    file_url: '#',
    type: 'pdf',
    created_at: '2026-03-01T00:00:00Z',
  },
  {
    id: 'mat2',
    title: 'Guia — As Rotas da Vida',
    description:
      'Como mapear as jornadas da sua cliente ideal e criar ofertas alinhadas com cada momento da vida dela.',
    category: 'Estratégia',
    file_url: '#',
    type: 'pdf',
    created_at: '2026-03-05T00:00:00Z',
  },
  {
    id: 'mat3',
    title: 'Áudio — Reprogramação Matinal',
    description:
      'Sessão de 10 minutos para começar o dia com foco, intenção e frequência de alto valor.',
    category: 'Reprogramação',
    file_url: '#',
    type: 'audio',
    created_at: '2026-03-10T00:00:00Z',
  },
  {
    id: 'mat4',
    title: 'Template — Bio do Instagram de Alto Valor',
    description:
      'Templates testados para bio do Instagram que posicionam você como autoridade e geram curiosidade imediata.',
    category: 'Instagram',
    file_url: '#',
    type: 'pdf',
    created_at: '2026-03-12T00:00:00Z',
  },
  {
    id: 'mat5',
    title: 'Masterclass — Precificação sem Culpa',
    description:
      'Aula gravada sobre como definir seus preços de forma que reflita seu valor real.',
    category: 'Estratégia',
    file_url: '#',
    type: 'video',
    created_at: '2026-03-15T00:00:00Z',
  },
  {
    id: 'mat6',
    title: 'Lista — 30 Ideias de Conteúdo que Posiciona',
    description:
      'Ideias de conteúdo para o Instagram que constroem autoridade sem depender de viral ou trends.',
    category: 'Instagram',
    file_url: '#',
    type: 'pdf',
    created_at: '2026-03-18T00:00:00Z',
  },
]
