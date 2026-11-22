// Restyles the generated reference entries: the `Usage:` and `Type:` blocks become one
// tabbed box, and the long sections fold. The reference pages are CommonMark, so this is
// done on the tree rather than by writing JSX into the generated markdown.
//
// A rehype plugin, not a remark one: on CommonMark pages Docusaurus runs rehype-raw
// first, and every JSX node already in the tree when it runs costs a stitching pass.

const FOLDED = new Set([
  'Arguments',
  'Methods',
  'Callbacks',
  'Composition methods',
  'Standard source methods',
]);

const REFERENCE_PAGE = /[/\\]reference(-extras|-deprecated)?[/\\]/;

const isBlank = (node) => node.type === 'text' && !node.value.trim();

function sectionTitle(node) {
  if (node?.type !== 'element' || node.tagName !== 'p' || node.children.length !== 1)
    return null;
  const [child] = node.children;
  if (child.type !== 'text') return null;
  const m = /^(.+):$/.exec(child.value.trim());
  return m ? m[1] : null;
}

const isElement = (node, tagName) => node?.type === 'element' && node.tagName === tagName;

const jsx = (name, attributes, children) => ({
  type: 'mdxJsxFlowElement',
  name,
  attributes: Object.entries(attributes).map(([name, value]) => ({
    type: 'mdxJsxAttribute',
    name,
    value,
  })),
  children,
});

function signatureTabs(usage, type) {
  return jsx('Tabs', { groupId: 'reference-signature' }, [
    jsx('TabItem', { value: 'usage', label: 'Usage' }, [usage]),
    jsx('TabItem', { value: 'type', label: 'Type' }, [type]),
  ]);
}

function fold(title, list) {
  return jsx('details', {}, [jsx('summary', {}, [{ type: 'text', value: title }]), list]);
}

function rewrite(children) {
  const nodes = children.filter((node) => !isBlank(node));
  const out = [];
  for (let i = 0; i < nodes.length; i++) {
    const title = sectionTitle(nodes[i]);
    const next = nodes[i + 1];
    if (
      title === 'Usage' &&
      isElement(next, 'pre') &&
      sectionTitle(nodes[i + 2]) === 'Type' &&
      isElement(nodes[i + 3], 'pre')
    ) {
      out.push(signatureTabs(next, nodes[i + 3]));
      i += 3;
    } else if (FOLDED.has(title) && isElement(next, 'ul')) {
      out.push(fold(title, next));
      i += 1;
    } else {
      out.push(nodes[i]);
    }
  }
  return out;
}

export default function referenceSections() {
  return (tree, file) => {
    if (!REFERENCE_PAGE.test(file.path ?? '')) return;
    tree.children = rewrite(tree.children);
  };
}
