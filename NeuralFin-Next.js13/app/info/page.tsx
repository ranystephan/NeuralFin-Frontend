'use client'

import Chat from '@/components/Chat'
import { DataTable } from '@/components/DataTable'
import { Payment, columns } from "./columns"


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function Info() {
  const data = await getData()

  return(
    <div>
      <Chat />
      <div className='container mx-auto py-10'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )

};

