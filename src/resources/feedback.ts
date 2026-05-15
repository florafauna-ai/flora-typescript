// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Product feedback endpoints.
 */
export class Feedback extends APIResource {
  /**
   * Records product feedback from the authenticated user, optionally linked to a
   * workspace, project, run, and attempted tools. Mutating public API requests
   * support an optional Idempotency-Key header for client retries; duplicate keys
   * within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.feedback.record({
   *   detail:
   *     'I want to export all generated campaign images at once.',
   *   kind: 'feature_request',
   *   summary: 'Need batch export support',
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
   * Feedback kind
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
   * Project identifier
   */
  project_id?: string;

  /**
   * Run identifier
   */
  run_id?: string;

  /**
   * Workspace identifier
   */
  workspace_id?: string;
}

export declare namespace Feedback {
  export {
    type FeedbackRecordResponse as FeedbackRecordResponse,
    type FeedbackRecordParams as FeedbackRecordParams,
  };
}
