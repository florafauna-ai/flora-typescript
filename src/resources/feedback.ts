// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Product feedback endpoints.
 */
export class Feedback extends APIResource {
  /**
   * Records product feedback from the authenticated user. Use
   * kind=missing_capability for blocked public API workflows such as unsupported
   * upload-asset source hosts, and include attempted_tools when relevant. Feedback
   * can be optionally linked to a workspace, project, or run. Mutating public API
   * requests support an optional Idempotency-Key header for client retries;
   * duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.feedback.record({
   *   detail:
   *     'upload-asset rejected an image hosted on scontent-lga3-1.cdninstagram.com.',
   *   kind: 'missing_capability',
   *   summary: 'Need support for Instagram CDN asset URLs',
   * });
   * ```
   */
  record(body: FeedbackRecordParams, options?: RequestOptions): APIPromise<FeedbackRecordResponse> {
    return this._client.post('/feedback', { body, ...options });
  }
}

export interface FeedbackRecordResponse {
  /**
   * Feedback identifier
   */
  feedback_id: string;

  received_at: number;
}

export interface FeedbackRecordParams {
  /**
   * Detailed description
   */
  detail: string;

  /**
   * Feedback kind. Use missing_capability for blocked API workflows such as
   * unsupported asset source hosts.
   */
  kind: 'feature_request' | 'bug' | 'technique_request' | 'missing_capability';

  /**
   * Short summary
   */
  summary: string;

  /**
   * Tools or capabilities attempted before submitting feedback
   */
  attempted_tools?: Array<string>;

  /**
   * Project identifier. Use the public API ID returned by list projects; it must
   * start with prj\_.
   */
  project_id?: string;

  /**
   * Run identifier. It must start with run\_.
   */
  run_id?: string;

  /**
   * Workspace identifier. Use the public API ID returned by list workspaces; it must
   * start with ws\_.
   */
  workspace_id?: string;
}

export declare namespace Feedback {
  export {
    type FeedbackRecordResponse as FeedbackRecordResponse,
    type FeedbackRecordParams as FeedbackRecordParams,
  };
}
