"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useNavigation } from "@/hooks/navigation"

type MenuProps = {
  orientation: "mobile" | "desktop"
}

const Menu = ({ orientation }: MenuProps) => {
  const { section, onSetSection } = useNavigation()

  switch (orientation) {
	case "desktop":
	  return (
		<Card className="bg-themeGray border-themeGray bg-clip-padding backdrop-blur_safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex hidden rounded-xl">
		  <CardContent className="p-0 flex gap-2">
		  </CardContent>
		</Card>
	  )
	case "mobile":
	  return <div></div>
	default:
	  return <div></div>
  }
}

export default Menu