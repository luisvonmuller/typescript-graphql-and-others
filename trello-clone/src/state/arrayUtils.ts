type Item = {
  id: string,
}

/* This is a Wonderfull Generic :3 */
export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
) => {
  return items.findIndex((item: TItem) => item.id === id)
}