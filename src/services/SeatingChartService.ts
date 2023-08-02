import {SeatingChart} from '../store/slices/wedding';

interface SeatingChartServiceEntry {
  name: string,
  pattern: RegExp,
  table: string,
}

type SeatingChartServiceList = SeatingChartServiceEntry[];

export class SeatingChartService {
  private static tableSearchPattern: RegExp = /^(?:(?:(.*) Table)|(?:Table (\d+)))$/i;

  private list: SeatingChartServiceList = [];

  private tags: string[] = [];

  public constructor(data?: SeatingChart) {
    if (data) {
      this.fromData(data);
    }
  }

  private fromData(data: SeatingChart) {
    const tagsSet: Set<string> = new Set();
    const nameToPattern = (name: string) => {
      if (name.charAt(0) === '*') {
        const tag = name.substring(1);
        tagsSet.add(tag);
        return tag;
      }

      const names = name.split(' ');
      const regexNames = [names[0]];
      for (let i = 1; i < names.length; i += 1) {
        regexNames.push(`( ${names[i]})?`);
      }
      const lastName = names[names.length - 1];
      return `(${regexNames.join('')})|(${lastName})`;
    };

    this.list = [];
    for (const [table, entries] of Object.entries(data)) {
      for (const entry of entries) {
        const listEntry: Partial<SeatingChartServiceEntry> = {table};
        if (typeof entry === 'string') {
          listEntry.name = entry;
          listEntry.pattern = new RegExp(`^((${nameToPattern(entry)}))$`, 'i');
        } else if (Array.isArray(entry) && entry.length > 0) {
          [listEntry.name] = entry;
          const entryPattern = entry
            .filter((alias) => typeof alias === 'string')
            .map((alias) => nameToPattern(alias)).join(')|(');
          listEntry.pattern = new RegExp(`^((${entryPattern}))$`, 'i');
        }

        this.list.push(listEntry as SeatingChartServiceEntry);
      }
    }

    this.tags = Array.from(tagsSet);
  }

  public getTable(name: string): [string, string][] {
    const tableSearch = name.match(SeatingChartService.tableSearchPattern);
    if (tableSearch !== null) {
      const selectedTable = tableSearch[1] ?? tableSearch[2];
      if (!selectedTable) {
        return [];
      }
      return this.list
        .filter(({table}) => table.localeCompare(
          selectedTable,
          undefined,
          {sensitivity: 'base'},
        ) === 0)
        .map(({name, table}) => [name, table]);
    }
    return this.list
      .filter(({pattern}) => pattern.test(name))
      .map(({name, table}) => [name, table]);
  }

  public getTablePartial(name: string): [string, string][] {
    // Search for names that contain the given name as a substring (case-insensitive)
    const searchPattern = new RegExp(name, 'i');
    return this.list
      .filter(({name}) => searchPattern.test(name))
      .map(({name, table}) => [name, table]);
  }

  public getRandomTag(): string {
    return this.tags[Math.floor(Math.random() * this.tags.length)];
  }
}