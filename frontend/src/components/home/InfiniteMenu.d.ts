interface InfiniteMenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface InfiniteMenuProps {
  items?: InfiniteMenuItem[];
  scale?: number;
  onActiveItemChange?: (index: number) => void;
}

declare function InfiniteMenu(props: InfiniteMenuProps): JSX.Element;
export default InfiniteMenu;
