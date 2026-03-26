-- ─── Adicionar colunas ausentes na tabela courses ───────────────────────────
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS product_type text DEFAULT 'curso',
  ADD COLUMN IF NOT EXISTS is_free boolean DEFAULT false;

-- ─── Inserir produtos iniciais ───────────────────────────────────────────────
INSERT INTO public.courses (id, slug, title, description, thumbnail_url, total_lessons, total_duration, has_free_preview, purchase_url, price, category, product_type, is_free)
VALUES
  ('1', 'box-magnetize', 'Box Magnetize', '4 reprogramações mentais guiadas temáticas para transformar sua autoimagem, vendas, relação com dinheiro e posicionamento.', '', 8, 160, true, 'https://pay.hotmart.com/box-magnetize', 'R$ 97', 'mentalidade', 'curso', false),
  ('2', 'metodo-pav', 'Método PAV', 'Curso completo com mentalidade, posicionamento estratégico, perfil que converte no Instagram e funil de atração essencialista.', '', 14, 420, true, 'https://pay.hotmart.com/metodo-pav', 'R$ 997', 'negocios-femininos', 'curso', false),
  ('3', 'meditacao-manha', 'Meditação da Manhã', 'Sessão guiada de 10 minutos para começar o dia com foco, intenção e frequência de alto valor.', '', 1, 10, false, '', '', 'mentalidade', 'meditacao', true),
  ('4', 'meditacao-noturna', 'Meditação Noturna', 'Reprogramação subconsciente para ouvir enquanto você dorme. 15 minutos que trabalham enquanto você descansa.', '', 1, 15, false, '', '', 'mentalidade', 'meditacao', true),
  ('5', 'template-bio-instagram', 'Pack de Bio — Instagram de Alto Valor', '5 templates testados para bio do Instagram que posicionam você como autoridade.', '', 0, 0, false, 'https://pay.hotmart.com/template-bio', 'R$ 27', 'solucoes-ferramentas', 'template', false),
  ('6', 'planilha-precificacao', 'Planilha de Precificação sem Culpa', 'Calcule seu preço ideal com base no seu valor real.', '', 0, 0, false, 'https://pay.hotmart.com/planilha-precificacao', 'R$ 37', 'solucoes-ferramentas', 'planilha', false),
  ('7', 'prompts-conteudo-posicionamento', '30 Prompts de Conteúdo que Posiciona', 'Prompts prontos para criar conteúdo de autoridade no Instagram.', '', 0, 0, false, 'https://pay.hotmart.com/prompts-conteudo', 'R$ 17', 'solucoes-ferramentas', 'prompt', false)
ON CONFLICT (id) DO NOTHING;
