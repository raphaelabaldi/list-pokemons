export default function PokemonPage({ params }: { params: { id: string } }) {
  return (
    <>
      <p>name: {params.id}</p>
    </>
  );
}
