import { CardContainer } from "./styles";

interface CardProps {
  id: string;
  text: string;
  columnId: string;
  isPreview?: boolean;
}

export const Card = ({ id, text }: CardProps) => {
  return <CardContainer>{text}</CardContainer>;
};
