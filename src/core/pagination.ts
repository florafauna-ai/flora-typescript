// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { FLORAError } from './error';
import { FinalRequestOptions } from '../internal/request-options';
import { defaultParseResponse } from '../internal/parse';
import { type FLORA } from '../client';
import { APIPromise } from './api-promise';
import { type APIResponseProps } from '../internal/parse';
import { maybeObj } from '../internal/utils/values';

export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: FLORA;
  protected options: FinalRequestOptions;

  protected response: Response;
  protected body: unknown;

  constructor(client: FLORA, response: Response, body: unknown, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new FLORAError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: FLORA,
    request: Promise<APIResponseProps>,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super(
      client,
      request,
      async (client, props) =>
        new Page(client, props.response, await defaultParseResponse(client, props), props.options),
    );
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface ProjectsCursorPageResponse<Item> {
  projects: Array<Item>;

  meta: ProjectsCursorPageResponse.Meta;
}

export namespace ProjectsCursorPageResponse {
  export interface Meta {
    next_cursor?: string | null;
  }
}

export interface ProjectsCursorPageParams {
  cursor?: string;

  limit?: number;
}

export class ProjectsCursorPage<Item> extends AbstractPage<Item> implements ProjectsCursorPageResponse<Item> {
  projects: Array<Item>;

  meta: ProjectsCursorPageResponse.Meta;

  constructor(
    client: FLORA,
    response: Response,
    body: ProjectsCursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.projects = body.projects || [];
    this.meta = body.meta || {};
  }

  getPaginatedItems(): Item[] {
    return this.projects ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.meta?.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface TechniquesCursorPageResponse<Item> {
  techniques: Array<Item>;

  meta: TechniquesCursorPageResponse.Meta;
}

export namespace TechniquesCursorPageResponse {
  export interface Meta {
    next_cursor?: string | null;
  }
}

export interface TechniquesCursorPageParams {
  cursor?: string;

  limit?: number;
}

export class TechniquesCursorPage<Item>
  extends AbstractPage<Item>
  implements TechniquesCursorPageResponse<Item>
{
  techniques: Array<Item>;

  meta: TechniquesCursorPageResponse.Meta;

  constructor(
    client: FLORA,
    response: Response,
    body: TechniquesCursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.techniques = body.techniques || [];
    this.meta = body.meta || {};
  }

  getPaginatedItems(): Item[] {
    return this.techniques ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.meta?.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface GenerationsCursorPageResponse<Item> {
  generations: Array<Item>;

  meta: GenerationsCursorPageResponse.Meta;
}

export namespace GenerationsCursorPageResponse {
  export interface Meta {
    next_cursor?: string | null;
  }
}

export interface GenerationsCursorPageParams {
  cursor?: string;

  limit?: number;
}

export class GenerationsCursorPage<Item>
  extends AbstractPage<Item>
  implements GenerationsCursorPageResponse<Item>
{
  generations: Array<Item>;

  meta: GenerationsCursorPageResponse.Meta;

  constructor(
    client: FLORA,
    response: Response,
    body: GenerationsCursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.generations = body.generations || [];
    this.meta = body.meta || {};
  }

  getPaginatedItems(): Item[] {
    return this.generations ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.meta?.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface TechniqueRunsCursorPageResponse<Item> {
  technique_runs: Array<Item>;

  meta: TechniqueRunsCursorPageResponse.Meta;
}

export namespace TechniqueRunsCursorPageResponse {
  export interface Meta {
    next_cursor?: string | null;
  }
}

export interface TechniqueRunsCursorPageParams {
  cursor?: string;

  limit?: number;
}

export class TechniqueRunsCursorPage<Item>
  extends AbstractPage<Item>
  implements TechniqueRunsCursorPageResponse<Item>
{
  technique_runs: Array<Item>;

  meta: TechniqueRunsCursorPageResponse.Meta;

  constructor(
    client: FLORA,
    response: Response,
    body: TechniqueRunsCursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.technique_runs = body.technique_runs || [];
    this.meta = body.meta || {};
  }

  getPaginatedItems(): Item[] {
    return this.technique_runs ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.meta?.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface AssetsCursorPageResponse<Item> {
  assets: Array<Item>;

  meta: AssetsCursorPageResponse.Meta;
}

export namespace AssetsCursorPageResponse {
  export interface Meta {
    next_cursor?: string | null;
  }
}

export interface AssetsCursorPageParams {
  cursor?: string;

  limit?: number;
}

export class AssetsCursorPage<Item> extends AbstractPage<Item> implements AssetsCursorPageResponse<Item> {
  assets: Array<Item>;

  meta: AssetsCursorPageResponse.Meta;

  constructor(
    client: FLORA,
    response: Response,
    body: AssetsCursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.assets = body.assets || [];
    this.meta = body.meta || {};
  }

  getPaginatedItems(): Item[] {
    return this.assets ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.meta?.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}

export interface CanvasNodesCursorPageResponse<Item> {
  nodes: Array<Item>;

  meta: CanvasNodesCursorPageResponse.Meta;
}

export namespace CanvasNodesCursorPageResponse {
  export interface Meta {
    next_cursor?: string | null;
  }
}

export interface CanvasNodesCursorPageParams {
  cursor?: string;

  limit?: number;
}

export class CanvasNodesCursorPage<Item>
  extends AbstractPage<Item>
  implements CanvasNodesCursorPageResponse<Item>
{
  nodes: Array<Item>;

  meta: CanvasNodesCursorPageResponse.Meta;

  constructor(
    client: FLORA,
    response: Response,
    body: CanvasNodesCursorPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.nodes = body.nodes || [];
    this.meta = body.meta || {};
  }

  getPaginatedItems(): Item[] {
    return this.nodes ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const cursor = this.meta?.next_cursor;
    if (!cursor) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        cursor,
      },
    };
  }
}
