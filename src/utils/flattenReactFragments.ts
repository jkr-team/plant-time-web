import React from 'react';

type FlattenedChildren = ReturnType<typeof React.Children.toArray>;

export function flattenReactFragments(children: React.ReactNode): FlattenedChildren {
  const array = React.Children.toArray(children);

  return array.reduce((flattened: FlattenedChildren, child) => {
    if (React.isValidElement(child) && child.type === React.Fragment) {
      return [...flattened, ...flattenReactFragments(child.props.children)];
    }

    return [...flattened, child];
  }, []);
}
