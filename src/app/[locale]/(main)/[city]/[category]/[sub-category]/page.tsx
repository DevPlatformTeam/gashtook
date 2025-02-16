export default function SubCategoryPage({
  params,
}: {
  params: { city: string; category: string; subCategory: string };
}) {
  const { city, category, subCategory } = params;
  return (
    <div>
      <h1>{city}</h1>
      <h1>{category}</h1>
      <h1>{subCategory}</h1>
    </div>
  );
}
