interface ExampleCompProps {
  example: string;
}

export default function ExampleComponent({ example }: ExampleCompProps) {
  return <div>{example}</div>;
}
