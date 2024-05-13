import { notFound } from "next/navigation";

const getData = async () => {
  const res = await fetch(`${process.env.API_URL}posts`, {
    cache: "no-store",
  });
  if (!res.ok) return notFound();
  return res.json();
};

export default async function Home() {
  const data = await getData();
  
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Data List</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item.id} className='mb-5'>
            <h2>{item.title}</h2>
            <p>User ID: {item.userId}</p>
            <p>ID: {item.id}</p>
            <p>Description: {item.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
