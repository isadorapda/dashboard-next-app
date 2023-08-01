import { useEffect, useState } from 'react'
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2023-07-21T00:00:00.000Z',
      '2023-07-22T00:00:00.000Z',
      '2023-07-23T00:00:00.000Z',
      '2023-07-24T00:00:00.000Z',
      '2023-07-25T00:00:00.000Z',
      '2023-07-26T00:00:00.000Z',
      '2023-07-27T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}
const series = [
  {
    name: 'series1',
    data: [31, 120, 10, 28, 61, 18, 109],
  },
]

export default function Dashboard() {
  const [showChart, setShowChart] = useState(false)

  useEffect(() => {
    setShowChart(true)
  }, [])

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignContent="flex-start"
        >
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Registered this week
            </Text>
            {showChart && (
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            )}
          </Box>
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Open Rate
            </Text>
            {showChart && (
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            )}
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
