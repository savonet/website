import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import ApiSearch from '@site/src/components/ApiSearch';

// Registers `type: 'custom-apiSearch'` for use in themeConfig.navbar.items.
export default {
  ...ComponentTypes,
  'custom-apiSearch': ApiSearch,
};
