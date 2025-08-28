import { SupabaseQueryHandler } from '@/hooks/use-infinite-query'

const orderByUpdatedAt: SupabaseQueryHandler<'todos'> = (query) => {
  return query.order('updated_at', { ascending: false })
}
