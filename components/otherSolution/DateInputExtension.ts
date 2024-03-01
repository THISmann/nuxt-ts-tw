import { Extension } from '@tiptap/core';

export const DateInputExtension = Extension.create({
  name: 'dateInput',

  addCommands() {
    return {
      insertDateInput: () => ({ commands }: { commands: any }) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const dateInputHtml = `<input type="date" id="start" value="${currentDate}" min="2018-01-01"/>`;
        commands.insertContent(dateInputHtml);
      },
    };
  },
});
