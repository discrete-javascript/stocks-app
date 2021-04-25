import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { VariableSizeList } from 'react-window';
import ListSubheader from '@material-ui/core/ListSubheader';

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);

  const LISTBOX_PADDING = 8; // px

  function renderRow(props) {
    const { data, index, style } = props;
    return React.cloneElement(data[index], {
      style: {
        ...style,
        top: style.top + LISTBOX_PADDING,
      },
    });
  }

  const OuterElementContext = createContext({});

  const OuterElementType = forwardRef((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  function useResetCache(data) {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  const itemCount = itemData.length;
  const itemSize = 36;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

export default ListboxComponent;
