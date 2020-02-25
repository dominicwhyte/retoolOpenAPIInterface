/*
 * MainSidebar Messages
 *
 * This contains all the text for the MainSidebar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MainSidebar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MainSidebar component!',
  },
});
