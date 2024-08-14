import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"

import { Dropdown } from "../ui-components/DropDown"
import { useEffect, useState } from "react"

interface Product {
  category: string;
  // Add other properties of the Product interface
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "rgb(59 130 246)",
  }
} satisfies ChartConfig

export function VerticalBarChart({ data, x, y, chartTitle, action }:{
  data: Product[];
  x: string;
  y: string;
  chartTitle: string;
  action: string;
}) {
  const [productCategory, setProductCategory] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
      e.preventDefault()
      switch (type) {
          case 'category':
              console.log(e.target.value);
              
              setProductCategory(e.target.value);
              const filteredData = data.filter((data: Product) => data.category === e.target.value);
              setFilteredData(filteredData)
              if(e.target.value === ''){
                setFilteredData(data)
                console.log('sdbvkb');
              }
              console.log(filteredData)
              break;
            }
          }
          // console.log(productCategory)              

  useEffect(()=>{
    if(filteredData.length === 0){
      setFilteredData(data)
    }
  },[data])

  return (
    <Card className="">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
        <CardTitle>{chartTitle}</CardTitle>
        {action === 'true' ? <div>
          <Dropdown
                  label="ALL"
                  value={productCategory}
                  options={[
                      // {value: "category", label: " Category"},
                      { value: "electronics", label: "Electronics" },
                      { value: "jewelery", label: "Jewelery" },
                      { value: "men's clothing", label: "Men's clothing" },
                      { value: "women's clothing", label: "Women's clothing" },
                    ]}
                  onChange={(e) => handleFilter(e, 'category')}
                />
        </div>:""}
        {/* <CardDescription>No. of Ev's in different countries</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={x}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey={y} fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}