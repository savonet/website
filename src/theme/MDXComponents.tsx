import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

// The reference pages are CommonMark and cannot import components; the
// reference-sections rehype plugin emits these by name.
export default {
  ...MDXComponents,
  Tabs,
  TabItem,
};
