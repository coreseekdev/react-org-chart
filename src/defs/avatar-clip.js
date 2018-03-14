const defaultConfig = {
  borderRadius: 4
}

module.exports = function defineAvatarClip(svg, id, config = {}) {
  config = {
    ...defaultConfig,
    ...config
  }

  const defs = svg.append('svg:defs')

  defs
    .append('clipPath')
    .attr('id', id)
    .append('circle')
    .attr('cx', 34)
    .attr('cy', 34)
    .attr('r', 18)
}
