import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "rgb(59 130 246)",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function LineCharts({data}) {
    const [productCategory, setProductCategory] = useState('')
    const [filteredData, setFilteredData] = useState(data)
    
    console.log(data);
    
    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
        e.preventDefault()
        switch (type) {
            case 'category':
                setProductCategory(e.target.value);
                const filteredData = data.filter((product: Product) => product.category === e.target.value);
                setFilteredData(filteredData)
                break;
        }
    }
    useEffect(()=>{  
        if(filteredData.length === 0){
            setFilteredData(data)
        }
    }, [data, filteredData.length])


    
  return (
    <Card className="">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
        <CardTitle>Poduct Popularity</CardTitle>
        <Dropdown
                  label="ALL"
                  value={productCategory}
                  options={[
                      { value: "electronics", label: "electronics" },
                      { value: "jewelery", label: "jewelery" },
                      { value: "men's clothing", label: "men's clothing" },
                      { value: "women's clothing", label: "women's clothing" },
                    ]}
                  onChange={(e) => handleFilter(e, 'category')}
                />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              top: 2,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="title"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="popularityIndex"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                name="value"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
