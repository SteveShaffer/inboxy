// inboxy: Chrome extension for Google Inbox-style bundles in Gmail.
// Copyright (C) 2021  Teresa Ou

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

let useLabelColors = false;

global.chrome = {
    storage: {
        sync: {
            get: (settingLabels, callback) => {
                callback({useLabelColors})
            }
        }
    }
};

import BundleRow from '../src/components/BundleRow';

// TODO: This is a terribly brittle mock.
function createMockMessages() {
    return [{
        // TODO: Probably should be a DOM node not text
        querySelector: () => 'fake snoozed text',
        // fake sender els
        querySelectorAll: () => [{
            classList: {
                contains: () => false  // fake unread sender
            }
        }],
        classList: {
            contains: () => false // fake unread
        }
    }];
}

function mockChromeStorage(useLabelColors) {
    // TODO: Does this really work?
    
}

const FAKE_TEXT_COLOR = 'fakeTextColor';
const FAKE_BACKGROUND_COLOR = 'fakeBackgroundColor';
const FAKE_BORDER_COLOR = 'fakeBorderColor';

test('label colors (when defined) are applied to bundle row', () => {
    useLabelColors = true;
    const mockMessages = createMockMessages();
    const el = BundleRow.create('test', 0, mockMessages, false, () => {}, 'baseUrl', 
        FAKE_TEXT_COLOR, FAKE_BACKGROUND_COLOR, FAKE_BORDER_COLOR);
    expect(el.innerHTML).toContain(FAKE_TEXT_COLOR);
    expect(el.innerHTML).toContain(FAKE_BACKGROUND_COLOR);
    expect(el.innerHTML).toContain(FAKE_BORDER_COLOR);
});

test('label colors (when not defined) are not applied to bundle row', () => {
    useLabelColors = false;
    const mockMessages = createMockMessages();
    const el = BundleRow.create('test', 0, mockMessages, false, () => {}, 'baseUrl',
        FAKE_TEXT_COLOR, FAKE_BACKGROUND_COLOR, FAKE_BORDER_COLOR);
    // TODO: Also check the style tag doesn't even get inserted into the DOM
    expect(el.innerHTML).not.toContain(FAKE_TEXT_COLOR);
    expect(el.innerHTML).not.toContain(FAKE_BACKGROUND_COLOR);
    expect(el.innerHTML).not.toContain(FAKE_BORDER_COLOR);
});
