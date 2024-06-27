import { ArchiveIcon, Check, FileText, HandCoins, Settings } from 'lucide-react'


export const productLinks = [
          {
                    accessLink: '/admin/products',
                    header: 'Manage',
                    bgColor: 'bg-gray-500',
                    icon: Settings
          },
          {
                    accessLink: 'available',
                    header: 'Available',
                    bgColor: 'bg-blue-500',
                    icon: Check
          },
          {
                    accessLink: 'sold',
                    header: 'Sold',
                    bgColor: 'bg-yellow-500',
                    icon: HandCoins
          },
          {
                    accessLink: 'archive',
                    header: 'Archive',
                    bgColor: 'bg-red-500',
                    icon: ArchiveIcon
          },
          {
                    accessLink: 'description',
                    header: 'Descriptions',
                    bgColor: 'bg-gray-600',
                    icon: FileText
          },
]