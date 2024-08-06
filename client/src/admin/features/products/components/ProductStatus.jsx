import { Badge } from "@/components/ui/badge"

export const AvailableBadge = ({ className, ...props }) => {
          return (
                    <Badge className={`flex justify-center bg-blue-500 hover:bg-blue-500/60 ${className}`} {...props}>Available</Badge>
          )
}
export const SoldBadge = ({ className, ...props }) => {
          return (
                    <Badge className={`flex justify-center bg-yellow-500 hover:bg-yellow-500/60 ${className}`} {...props}>Sold</Badge>
          )
}

export const ArchiveBadge = ({ className, ...props }) => {
          return (
                    <Badge variant="destructive" className={`flex justify-center ${className}`} {...props}>Archive</Badge>
          )
}

export const PendingBadge = ({ className, ...props }) => {
          return (
                    <Badge  className={`flex justify-center bg-orange-500 hover:bg-orange-500/60 ${className}`} {...props}>Archive</Badge>
          )
}

export const StatusBadge = ({ status, ...props }) => {
          switch (status) {
                    case "Available":
                              return <AvailableBadge {...props} />

                    case "Sold":
                              return <SoldBadge {...props} />

                    case "Archive":
                              return <ArchiveBadge {...props} />

                    case "Pending":
                              return <ArchiveBadge {...props} />

                    default:
                              return <AvailableBadge {...props} />

          }
}