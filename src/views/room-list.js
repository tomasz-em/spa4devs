import $ from 'jquery';

export const roomsList = (pokoje) => {
  const ul = $('<ul></ul>');

  const rooms = pokoje.map(pokoj => {
    const li = $('<li></li>');
    li.text(pokoj.name);
    return li;
  });

  ul.append(rooms);

  return ul;
};