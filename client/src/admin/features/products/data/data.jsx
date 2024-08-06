import { ArchiveIcon, Check, CheckCheckIcon, FileText, HandCoins, Settings } from 'lucide-react'

export const staticProductImageUrl = 'http://localhost:8000/images/products';

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

export const productGender = [
          "Girls",
          "Boys",
          "Unisex",
          "Men",
          "Women"
]
export const productStatus = {
          available: { text: "Available", icon: CheckCheckIcon },
          sold: { text: "Sold", icon: HandCoins },
          archive: { text: "Archive", icon: ArchiveIcon },
}

export const discountTypes = {
          fixed: "Fixed",
          percentage: "Percentage",
}