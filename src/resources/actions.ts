// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Actions extends APIResource {
  /**
   * Returns released prebuilt Flora actions that can be executed by the public API.
   * Action identifiers are raw slugs such as rotate-image, not action-prefixed IDs.
   */
  list(options?: RequestOptions): APIPromise<ActionListResponse> {
    return this._client.get('/actions', options);
  }

  /**
   * Returns metadata for one released prebuilt Flora action. Action identifiers are
   * raw slugs such as rotate-image, not action-prefixed IDs.
   */
  retrieve(
    actionID:
      | 'color-grade-image-browser'
      | 'overlay-image-browser'
      | 'draw-image-browser'
      | 'crop-image-browser'
      | 'scene-3d-image-browser'
      | 'blur-image-browser'
      | 'change-image-ar-browser'
      | 'rotate-image-browser'
      | 'color-filter-image-browser'
      | 'color-tint-image-browser'
      | 'filter-color-image-browser'
      | 'duplicate-image-browser'
      | 'side-by-side-composite-browser'
      | 'add-shape-to-image-browser'
      | 'add-text-to-image-browser'
      | 'qr-code-generator-browser'
      | 'resize-image-browser'
      | 'shader-effect-browser'
      | 'split-text-browser'
      | 'find-and-replace-text-browser'
      | 'concat-text-browser'
      | 'ken-burns-video'
      | 'stitch-videos'
      | 'split-video'
      | 'extract-video-frames'
      | 'color-grade-video'
      | 'video-to-frame-grid'
      | 'boomerang-video'
      | 'reverse-video'
      | 'video-to-long-exposure'
      | 'video-effect'
      | 'color-filter-video'
      | 'speed-up-video'
      | 'slow-down-video'
      | 'duplicate-video'
      | 'greenscreen-video'
      | 'resize-video'
      | 'change-video-ar'
      | 'split-audio-from-video'
      | 'merge-audio-into-video',
    options?: RequestOptions,
  ): APIPromise<ActionRetrieveResponse> {
    return this._client.get(path`/actions/${actionID}`, options);
  }

  /**
   * Starts a headless prebuilt action run using raw action slugs such as
   * rotate-image, workspace_id, project_id, and non-empty inputs. Direct action runs
   * do not create or mutate canvas nodes. Mutating public API requests support an
   * optional Idempotency-Key header for client retries; duplicate keys within two
   * hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.actions.run({
   *   action_id: 'color-grade-image-browser',
   *   inputs: [{ type: 'image' }],
   *   project_id: 'prj_abc123',
   *   workspace_id: 'ws_abc123',
   * });
   * ```
   */
  run(body: ActionRunParams, options?: RequestOptions): APIPromise<ActionRunResponse> {
    return this._client.post('/runs/action', { body, ...options });
  }
}

export interface ActionRetrieveResponse {
  /**
   * Action identifier
   */
  action_id:
    | 'color-grade-image-browser'
    | 'overlay-image-browser'
    | 'draw-image-browser'
    | 'crop-image-browser'
    | 'scene-3d-image-browser'
    | 'blur-image-browser'
    | 'change-image-ar-browser'
    | 'rotate-image-browser'
    | 'color-filter-image-browser'
    | 'color-tint-image-browser'
    | 'filter-color-image-browser'
    | 'duplicate-image-browser'
    | 'side-by-side-composite-browser'
    | 'add-shape-to-image-browser'
    | 'add-text-to-image-browser'
    | 'qr-code-generator-browser'
    | 'resize-image-browser'
    | 'shader-effect-browser'
    | 'split-text-browser'
    | 'find-and-replace-text-browser'
    | 'concat-text-browser'
    | 'ken-burns-video'
    | 'stitch-videos'
    | 'split-video'
    | 'extract-video-frames'
    | 'color-grade-video'
    | 'video-to-frame-grid'
    | 'boomerang-video'
    | 'reverse-video'
    | 'video-to-long-exposure'
    | 'video-effect'
    | 'color-filter-video'
    | 'speed-up-video'
    | 'slow-down-video'
    | 'duplicate-video'
    | 'greenscreen-video'
    | 'resize-video'
    | 'change-video-ar'
    | 'split-audio-from-video'
    | 'merge-audio-into-video';

  /**
   * Cost per execution in USD
   */
  charged_cost: number;

  /**
   * Action description
   */
  description: string;

  /**
   * Action input slots
   */
  inputs: Array<ActionRetrieveResponse.Input>;

  /**
   * Action runtime language
   */
  language: 'javascript' | 'python';

  /**
   * Action name
   */
  name: string;

  /**
   * Action output slots
   */
  outputs: Array<ActionRetrieveResponse.Output>;

  /**
   * Action parameters
   */
  params: Array<ActionRetrieveResponse.Param>;
}

export namespace ActionRetrieveResponse {
  export interface Input {
    /**
     * Action input or output name
     */
    name: string;

    /**
     * Action input or output media type
     */
    type: 'image' | 'video' | 'text' | 'audio';

    /**
     * Deprecated alias for `multiple: true`. Mirrors `multiple` for back-compat.
     */
    dynamic?: boolean;

    /**
     * Many-connections form. `true` is unbounded shorthand; the object form sets
     * explicit min/max bounds.
     */
    multiple?: true | Input.UnionMember1;

    /**
     * Whether the slot allows zero connections in single-input mode. Ignored when
     * `multiple` is the object form (use `min: 0` there instead).
     */
    optional?: boolean;
  }

  export namespace Input {
    export interface UnionMember1 {
      max?: number;

      min?: number;
    }
  }

  export interface Output {
    /**
     * Action input or output name
     */
    name: string;

    /**
     * Action input or output media type
     */
    type: 'image' | 'video' | 'text' | 'audio';

    /**
     * Deprecated alias for `multiple: true`. Mirrors `multiple` for back-compat.
     */
    dynamic?: boolean;

    /**
     * Many-connections form. `true` is unbounded shorthand; the object form sets
     * explicit min/max bounds.
     */
    multiple?: true | Output.UnionMember1;

    /**
     * Whether the slot allows zero connections in single-input mode. Ignored when
     * `multiple` is the object form (use `min: 0` there instead).
     */
    optional?: boolean;
  }

  export namespace Output {
    export interface UnionMember1 {
      max?: number;

      min?: number;
    }
  }

  export interface Param {
    /**
     * Action parameter key
     */
    key: string;

    /**
     * Action parameter control type
     */
    type: string;

    /**
     * Allowed parameter values
     */
    available_values?: Array<Param.AvailableValue>;

    /**
     * Default parameter value
     */
    default_value?: unknown;

    /**
     * Action parameter description
     */
    info_tooltip?: string;

    /**
     * Action parameter label
     */
    label?: string;

    max_number_value?: number;

    min_number_value?: number;

    number_step?: number;
  }

  export namespace Param {
    export interface AvailableValue {
      label: string;

      value: string;

      description?: string;
    }
  }
}

export interface ActionListResponse {
  actions: Array<ActionListResponse.Action>;
}

export namespace ActionListResponse {
  export interface Action {
    /**
     * Action identifier
     */
    action_id:
      | 'color-grade-image-browser'
      | 'overlay-image-browser'
      | 'draw-image-browser'
      | 'crop-image-browser'
      | 'scene-3d-image-browser'
      | 'blur-image-browser'
      | 'change-image-ar-browser'
      | 'rotate-image-browser'
      | 'color-filter-image-browser'
      | 'color-tint-image-browser'
      | 'filter-color-image-browser'
      | 'duplicate-image-browser'
      | 'side-by-side-composite-browser'
      | 'add-shape-to-image-browser'
      | 'add-text-to-image-browser'
      | 'qr-code-generator-browser'
      | 'resize-image-browser'
      | 'shader-effect-browser'
      | 'split-text-browser'
      | 'find-and-replace-text-browser'
      | 'concat-text-browser'
      | 'ken-burns-video'
      | 'stitch-videos'
      | 'split-video'
      | 'extract-video-frames'
      | 'color-grade-video'
      | 'video-to-frame-grid'
      | 'boomerang-video'
      | 'reverse-video'
      | 'video-to-long-exposure'
      | 'video-effect'
      | 'color-filter-video'
      | 'speed-up-video'
      | 'slow-down-video'
      | 'duplicate-video'
      | 'greenscreen-video'
      | 'resize-video'
      | 'change-video-ar'
      | 'split-audio-from-video'
      | 'merge-audio-into-video';

    /**
     * Cost per execution in USD
     */
    charged_cost: number;

    /**
     * Action description
     */
    description: string;

    /**
     * Action input slots
     */
    inputs: Array<Action.Input>;

    /**
     * Action runtime language
     */
    language: 'javascript' | 'python';

    /**
     * Action name
     */
    name: string;

    /**
     * Action output slots
     */
    outputs: Array<Action.Output>;

    /**
     * Action parameters
     */
    params: Array<Action.Param>;
  }

  export namespace Action {
    export interface Input {
      /**
       * Action input or output name
       */
      name: string;

      /**
       * Action input or output media type
       */
      type: 'image' | 'video' | 'text' | 'audio';

      /**
       * Deprecated alias for `multiple: true`. Mirrors `multiple` for back-compat.
       */
      dynamic?: boolean;

      /**
       * Many-connections form. `true` is unbounded shorthand; the object form sets
       * explicit min/max bounds.
       */
      multiple?: true | Input.UnionMember1;

      /**
       * Whether the slot allows zero connections in single-input mode. Ignored when
       * `multiple` is the object form (use `min: 0` there instead).
       */
      optional?: boolean;
    }

    export namespace Input {
      export interface UnionMember1 {
        max?: number;

        min?: number;
      }
    }

    export interface Output {
      /**
       * Action input or output name
       */
      name: string;

      /**
       * Action input or output media type
       */
      type: 'image' | 'video' | 'text' | 'audio';

      /**
       * Deprecated alias for `multiple: true`. Mirrors `multiple` for back-compat.
       */
      dynamic?: boolean;

      /**
       * Many-connections form. `true` is unbounded shorthand; the object form sets
       * explicit min/max bounds.
       */
      multiple?: true | Output.UnionMember1;

      /**
       * Whether the slot allows zero connections in single-input mode. Ignored when
       * `multiple` is the object form (use `min: 0` there instead).
       */
      optional?: boolean;
    }

    export namespace Output {
      export interface UnionMember1 {
        max?: number;

        min?: number;
      }
    }

    export interface Param {
      /**
       * Action parameter key
       */
      key: string;

      /**
       * Action parameter control type
       */
      type: string;

      /**
       * Allowed parameter values
       */
      available_values?: Array<Param.AvailableValue>;

      /**
       * Default parameter value
       */
      default_value?: unknown;

      /**
       * Action parameter description
       */
      info_tooltip?: string;

      /**
       * Action parameter label
       */
      label?: string;

      max_number_value?: number;

      min_number_value?: number;

      number_step?: number;
    }

    export namespace Param {
      export interface AvailableValue {
        label: string;

        value: string;

        description?: string;
      }
    }
  }
}

export interface ActionRunResponse {
  /**
   * Cost charged in USD
   */
  charged_cost: number;

  estimated_seconds: number | null;

  /**
   * Run identifier
   */
  run_id: string;

  /**
   * Run type
   */
  type: 'generation' | 'technique' | 'action';

  action?: ActionRunResponse.Action | null;

  model?: ActionRunResponse.Model | null;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string | null;

  /**
   * Project identifier
   */
  project_id?: string | null;

  technique?: ActionRunResponse.Technique | null;
}

export namespace ActionRunResponse {
  export interface Action {
    /**
     * Action identifier
     */
    action_id:
      | 'color-grade-image-browser'
      | 'overlay-image-browser'
      | 'draw-image-browser'
      | 'crop-image-browser'
      | 'scene-3d-image-browser'
      | 'blur-image-browser'
      | 'change-image-ar-browser'
      | 'rotate-image-browser'
      | 'color-filter-image-browser'
      | 'color-tint-image-browser'
      | 'filter-color-image-browser'
      | 'duplicate-image-browser'
      | 'side-by-side-composite-browser'
      | 'add-shape-to-image-browser'
      | 'add-text-to-image-browser'
      | 'qr-code-generator-browser'
      | 'resize-image-browser'
      | 'shader-effect-browser'
      | 'split-text-browser'
      | 'find-and-replace-text-browser'
      | 'concat-text-browser'
      | 'ken-burns-video'
      | 'stitch-videos'
      | 'split-video'
      | 'extract-video-frames'
      | 'color-grade-video'
      | 'video-to-frame-grid'
      | 'boomerang-video'
      | 'reverse-video'
      | 'video-to-long-exposure'
      | 'video-effect'
      | 'color-filter-video'
      | 'speed-up-video'
      | 'slow-down-video'
      | 'duplicate-video'
      | 'greenscreen-video'
      | 'resize-video'
      | 'change-video-ar'
      | 'split-audio-from-video'
      | 'merge-audio-into-video';
  }

  export interface Model {
    /**
     * Model identifier
     */
    model_id: string;
  }

  export interface Technique {
    /**
     * Technique name
     */
    name: string;

    /**
     * Technique identifier
     */
    technique_id: string;
  }
}

export type ActionRunParams =
  | ActionRunParams.Variant0
  | ActionRunParams.Variant1
  | ActionRunParams.Variant2
  | ActionRunParams.Variant3
  | ActionRunParams.Variant4
  | ActionRunParams.Variant5
  | ActionRunParams.Variant6
  | ActionRunParams.Variant7
  | ActionRunParams.Variant8
  | ActionRunParams.Variant9
  | ActionRunParams.Variant10
  | ActionRunParams.Variant11
  | ActionRunParams.Variant12
  | ActionRunParams.Variant13
  | ActionRunParams.Variant14
  | ActionRunParams.Variant15
  | ActionRunParams.Variant16
  | ActionRunParams.Variant17
  | ActionRunParams.Variant18
  | ActionRunParams.Variant19
  | ActionRunParams.Variant20
  | ActionRunParams.Variant21
  | ActionRunParams.Variant22
  | ActionRunParams.Variant23
  | ActionRunParams.Variant24
  | ActionRunParams.Variant25
  | ActionRunParams.Variant26
  | ActionRunParams.Variant27
  | ActionRunParams.Variant28
  | ActionRunParams.Variant29
  | ActionRunParams.Variant30
  | ActionRunParams.Variant31
  | ActionRunParams.Variant32
  | ActionRunParams.Variant33
  | ActionRunParams.Variant34
  | ActionRunParams.Variant35
  | ActionRunParams.Variant36
  | ActionRunParams.Variant37
  | ActionRunParams.Variant38
  | ActionRunParams.Variant39;

export declare namespace ActionRunParams {
  export interface Variant0 {
    action_id: 'color-grade-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant0.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant0.Params;
  }

  export namespace Variant0 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Show additional controls
       */
      advanced?: boolean;

      /**
       * Brightness
       */
      brightness?: number;

      /**
       * Contrast
       */
      contrast?: number;

      /**
       * Highlights
       */
      highlights?: number;

      /**
       * Hue Shift (deg)
       */
      hue_shift?: number;

      /**
       * Saturation
       */
      saturation?: number;

      /**
       * Shadows
       */
      shadows?: number;

      /**
       * Show Color Scope in preview
       */
      show_scope?: boolean;

      /**
       * Tint (Green-Magenta)
       */
      tint?: number;

      /**
       * Warmth
       */
      warmth?: number;
    }
  }

  export interface Variant1 {
    action_id: 'overlay-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant1.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant1.Params;
  }

  export namespace Variant1 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Blend
       */
      blend?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';

      /**
       * Center
       */
      center?: Params.Center;

      /**
       * Opacity
       */
      opacity?: number;

      /**
       * Rotation (deg)
       */
      rotation?: number;

      /**
       * Size
       */
      size?: Params.Size;
    }

    export namespace Params {
      /**
       * Center
       */
      export interface Center {
        x: number;

        y: number;
      }

      /**
       * Size
       */
      export interface Size {
        x: number;

        y: number;
      }
    }
  }

  export interface Variant2 {
    action_id: 'draw-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant2.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant2.Params;
  }

  export namespace Variant2 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Brush color
       */
      color?: string;

      /**
       * Erase
       */
      erase?: boolean;

      /**
       * Brush size
       */
      size?: number;
    }
  }

  export interface Variant3 {
    action_id: 'crop-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant3.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant3.Params;
  }

  export namespace Variant3 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Center
       */
      center?: Params.Center;

      /**
       * Lock ratio
       */
      lock_aspect?: boolean;

      /**
       * Rotation (deg)
       */
      rotation?: number;

      /**
       * Size
       */
      size?: Params.Size;
    }

    export namespace Params {
      /**
       * Center
       */
      export interface Center {
        x: number;

        y: number;
      }

      /**
       * Size
       */
      export interface Size {
        x: number;

        y: number;
      }
    }
  }

  export interface Variant4 {
    action_id: 'scene-3d-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant4.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant4.Params;
  }

  export namespace Variant4 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Aspect Ratio
       */
      aspect_ratio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

      /**
       * Background Color
       */
      background?: string;

      /**
       * Color
       */
      color?: string;

      /**
       * Offset
       */
      offset?: Params.Offset;

      /**
       * Rotation (deg)
       */
      rotation?: Params.Rotation;

      /**
       * Scale
       */
      scale?: Params.Scale;

      /**
       * Shape
       */
      shape?: 'cube' | 'sphere' | 'torus' | 'cone' | 'cylinder';

      /**
       * Include Background
       */
      show_background?: boolean;

      /**
       * Resolution (longest side)
       */
      size?: number;
    }

    export namespace Params {
      /**
       * Offset
       */
      export interface Offset {
        x: number;

        y: number;
      }

      /**
       * Rotation (deg)
       */
      export interface Rotation {
        x: number;

        y: number;

        z: number;
      }

      /**
       * Scale
       */
      export interface Scale {
        x: number;

        y: number;

        z: number;
      }
    }
  }

  export interface Variant5 {
    action_id: 'blur-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant5.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant5.Params;
  }

  export namespace Variant5 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Motion Angle (°)
       */
      angle?: number;

      /**
       * Blur Type
       */
      blur_type?:
        | 'gaussian'
        | 'box'
        | 'motion'
        | 'radial'
        | 'bilateral'
        | 'bokeh'
        | 'tiltshift'
        | 'targetcolor';

      /**
       * Bokeh Shape
       */
      bokeh_shape?: 'circle' | 'hexagon' | 'pentagon';

      /**
       * Brush Hardness
       */
      brush_hardness?: number;

      /**
       * Brush Intensity
       */
      brush_intensity?: number;

      /**
       * Brush Size (px)
       */
      brush_size?: number;

      /**
       * Edge Preservation
       */
      edge_threshold?: number;

      /**
       * Erase
       */
      erase?: boolean;

      /**
       * Mode
       */
      mode?: 'full' | 'draw';

      /**
       * Radial Mode
       */
      radial_mode?: 'zoom' | 'spin';

      /**
       * Radial Strength
       */
      radial_strength?: number;

      /**
       * Radius
       */
      radius?: number;

      /**
       * Target Color
       */
      target_color?: string;

      /**
       * Invert Selection (blur non-matching)
       */
      target_invert?: boolean;

      /**
       * Color Tolerance
       */
      target_tolerance?: number;

      /**
       * Sharp Band Center
       */
      tilt_center?: number;

      /**
       * Band Orientation
       */
      tilt_orientation?: 'horizontal' | 'vertical';

      /**
       * Sharp Band Width
       */
      tilt_width?: number;
    }
  }

  export interface Variant6 {
    action_id: 'change-image-ar-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant6.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant6.Params;
  }

  export namespace Variant6 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Aspect Ratio
       */
      aspect_ratio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '3:2' | '2:3' | '21:9';

      /**
       * Background
       */
      background_mode?: 'solid' | 'blur';

      /**
       * Blur Amount
       */
      blur_amount?: number;

      /**
       * Fit
       */
      fit?: 'crop' | 'pad';

      /**
       * Pad Color
       */
      pad_color?: string;
    }
  }

  export interface Variant7 {
    action_id: 'rotate-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant7.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant7.Params;
  }

  export namespace Variant7 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Angle (°, clockwise)
       */
      angle?: number;

      /**
       * Background Color
       */
      background?: string;

      /**
       * Canvas
       */
      canvas_mode?: 'shrink' | 'keep' | 'expand';

      /**
       * Flip
       */
      direction?: 'none' | 'horizontal' | 'vertical' | 'both';

      /**
       * Transparent Background
       */
      transparent?: boolean;
    }
  }

  export interface Variant8 {
    action_id: 'color-filter-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant8.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant8.Params;
  }

  export namespace Variant8 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Threshold
       */
      bw_threshold?: number;

      /**
       * Color Tolerance
       */
      colorpop_tolerance?: number;

      /**
       * Grid Angle (°)
       */
      dot_angle?: number;

      /**
       * Background
       */
      dot_bg?: string;

      /**
       * Dot Color
       */
      dot_color?: string;

      /**
       * Dot Size
       */
      dot_size?: number;

      /**
       * Filter
       */
      filter?:
        | 'grayscale'
        | 'sepia'
        | 'invert'
        | 'bw'
        | 'posterize'
        | 'solarize'
        | 'duotone'
        | 'clarendon'
        | 'moon'
        | 'nashville'
        | 'noir'
        | 'fade'
        | 'vignette'
        | 'colorpop'
        | 'crossprocess'
        | 'halftone';

      /**
       * Grain
       */
      grain?: number;

      /**
       * Highlight Color
       */
      highlight_color?: string;

      /**
       * Intensity
       */
      intensity?: number;

      /**
       * Bits per channel
       */
      posterize_bits?: number;

      /**
       * Warmth
       */
      sepia_warmth?: number;

      /**
       * Shadow Color
       */
      shadow_color?: string;

      /**
       * Threshold
       */
      solarize_threshold?: number;

      /**
       * Keep Color
       */
      target_color?: string;

      /**
       * Vignette Softness
       */
      vignette_softness?: number;

      /**
       * Vignette Strength
       */
      vignette_strength?: number;
    }
  }

  export interface Variant9 {
    action_id: 'color-tint-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant9.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant9.Params;
  }

  export namespace Variant9 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Blend Mode
       */
      blend_mode?: 'multiply' | 'screen' | 'overlay' | 'soft_light' | 'color';

      /**
       * Tint Color
       */
      color?: string;

      /**
       * Intensity
       */
      intensity?: number;
    }
  }

  export interface Variant10 {
    action_id: 'filter-color-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant10.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant10.Params;
  }

  export namespace Variant10 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Invert Selection
       */
      invert?: boolean;

      /**
       * Mode
       */
      mode?: 'remove' | 'replace' | 'keep';

      /**
       * Replacement Color
       */
      replacement_color?: string;

      /**
       * Edge Softness
       */
      softness?: number;

      /**
       * Target Color
       */
      target_color?: string;

      /**
       * Tolerance
       */
      tolerance?: number;
    }
  }

  export interface Variant11 {
    action_id: 'duplicate-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant11.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant11.Params;
  }

  export namespace Variant11 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Copies
       */
      count?: number;
    }
  }

  export interface Variant12 {
    action_id: 'side-by-side-composite-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant12.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant12.Params;
  }

  export namespace Variant12 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Background
       */
      background?: string;

      /**
       * Gap (px)
       */
      gap?: number;

      /**
       * Layout
       */
      layout?: 'auto' | 'horizontal-2' | 'horizontal-3' | 'vertical-2' | 'vertical-3' | 'grid-2x2';

      /**
       * Size Match
       */
      normalize?: 'match-shortest' | 'match-largest' | 'pad-to-largest';
    }
  }

  export interface Variant13 {
    action_id: 'add-shape-to-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant13.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant13.Params;
  }

  export namespace Variant13 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Background Color
       */
      background?: string;

      /**
       * Center
       */
      center?: Params.Center;

      /**
       * Fill Color
       */
      fill_color?: string;

      /**
       * Fill Opacity
       */
      fill_opacity?: number;

      /**
       * Height (px)
       */
      height?: number;

      /**
       * Rotation (deg)
       */
      rotation?: number;

      /**
       * Shape
       */
      shape?: 'rectangle' | 'ellipse' | 'triangle' | 'star' | 'hexagon';

      /**
       * Include Background
       */
      show_background?: boolean;

      /**
       * Size
       */
      size?: Params.Size;

      /**
       * Stroke Color
       */
      stroke_color?: string;

      /**
       * Stroke Width (px)
       */
      stroke_width?: number;

      /**
       * Width (px)
       */
      width?: number;
    }

    export namespace Params {
      /**
       * Center
       */
      export interface Center {
        x: number;

        y: number;
      }

      /**
       * Size
       */
      export interface Size {
        x: number;

        y: number;
      }
    }
  }

  export interface Variant14 {
    action_id: 'add-text-to-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant14.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant14.Params;
  }

  export namespace Variant14 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Background Color
       */
      background?: string;

      /**
       * Center
       */
      center?: Params.Center;

      /**
       * Text Color
       */
      color?: string;

      /**
       * Dimensions (px)
       */
      dimensions?: Params.Dimensions;

      /**
       * Font
       */
      font_family?: 'sans' | 'sans-bold' | 'sans-italic' | 'serif' | 'serif-bold' | 'mono' | 'mono-bold';

      /**
       * Font Size (px)
       */
      font_size?: number;

      /**
       * Max Width (px)
       */
      max_width?: number;

      /**
       * Opacity
       */
      opacity?: number;

      /**
       * Rotation (deg)
       */
      rotation?: number;

      /**
       * Shadow
       */
      shadow?: boolean;

      /**
       * Include Background
       */
      show_background?: boolean;

      /**
       * Text
       */
      text?: string;
    }

    export namespace Params {
      /**
       * Center
       */
      export interface Center {
        x: number;

        y: number;
      }

      /**
       * Dimensions (px)
       */
      export interface Dimensions {
        x: number;

        y: number;
      }
    }
  }

  export interface Variant15 {
    action_id: 'qr-code-generator-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant15.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant15.Params;
  }

  export namespace Variant15 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Background Color
       */
      bg_color?: string;

      /**
       * Quiet-Zone Border (modules)
       */
      border?: number;

      /**
       * Error Correction
       */
      error_correction?: 'L' | 'M' | 'Q' | 'H';

      /**
       * Foreground Color
       */
      fg_color?: string;

      /**
       * Size (px)
       */
      size?: number;
    }
  }

  export interface Variant16 {
    action_id: 'resize-image-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant16.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant16.Params;
  }

  export namespace Variant16 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Letterbox Color
       */
      bg_color?: string;

      /**
       * Fit
       */
      fit?: 'contain' | 'cover' | 'stretch';

      /**
       * Height (px)
       */
      height?: number;

      /**
       * Longest Side (px)
       */
      longest?: number;

      /**
       * Resize by
       */
      mode?: 'exact' | 'percent' | 'longest';

      /**
       * Scale (%)
       */
      percent?: number;

      /**
       * Width (px)
       */
      width?: number;
    }
  }

  export interface Variant17 {
    action_id: 'shader-effect-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant17.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant17.Params;
  }

  export namespace Variant17 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Strength
       */
      bloom_strength?: number;

      /**
       * Threshold
       */
      bloom_threshold?: number;

      /**
       * Thickness
       */
      edge_thickness?: number;

      /**
       * Effect
       */
      effect?: 'chromatic' | 'glitch' | 'edges' | 'crt' | 'ripple' | 'kaleidoscope' | 'bloom' | 'pixelate';

      /**
       * Glitch
       */
      glitch_amount?: number;

      /**
       * Intensity
       */
      intensity?: number;

      /**
       * Amplitude
       */
      ripple_amp?: number;

      /**
       * Frequency
       */
      ripple_freq?: number;

      /**
       * Scanlines
       */
      scanline_strength?: number;

      /**
       * Segments
       */
      segments?: number;

      /**
       * Shift (px)
       */
      shift?: number;
    }
  }

  export interface Variant18 {
    action_id: 'split-text-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant18.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant18.Params;
  }

  export namespace Variant18 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Characters per Part
       */
      chars_per_part?: number;

      /**
       * Lines per Part
       */
      lines_per_part?: number;

      /**
       * Max Parts
       */
      max_parts?: number;

      /**
       * Separator
       */
      separator?: string;

      /**
       * Skip Empty Parts
       */
      skip_empty?: boolean;

      /**
       * Split Mode
       */
      split_mode?: 'separator' | 'paragraph' | 'lines' | 'charCount';

      /**
       * Trim Whitespace
       */
      trim_parts?: boolean;
    }
  }

  export interface Variant19 {
    action_id: 'find-and-replace-text-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant19.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant19.Params;
  }

  export namespace Variant19 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Case Sensitive
       */
      case_sensitive?: boolean;

      /**
       * Find
       */
      find?: string;

      /**
       * Replace With
       */
      replace?: string;

      /**
       * Replace All Occurrences
       */
      replace_all?: boolean;

      /**
       * Whole Word Only
       */
      whole_word?: boolean;
    }
  }

  export interface Variant20 {
    action_id: 'concat-text-browser';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant20.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant20.Params;
  }

  export namespace Variant20 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Add Input Name Headers
       */
      add_headers?: boolean;

      /**
       * Prefix
       */
      prefix?: string;

      /**
       * Separator
       */
      separator?: string;

      /**
       * Skip Empty Parts
       */
      skip_empty?: boolean;

      /**
       * Suffix
       */
      suffix?: string;

      /**
       * Trim Each Part
       */
      trim_parts?: boolean;

      /**
       * Wrap Each Part
       */
      wrap_each_part?: boolean;
    }
  }

  export interface Variant21 {
    action_id: 'ken-burns-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant21.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant21.Params;
  }

  export namespace Variant21 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Duration (s)
       */
      duration?: number;

      /**
       * Easing
       */
      easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

      /**
       * FPS
       */
      fps?: '24' | '30' | '60';

      /**
       * Pan
       */
      pan_direction?: 'none' | 'left' | 'right' | 'up' | 'down';

      /**
       * Zoom Level
       */
      zoom?: number;

      /**
       * Zoom Direction
       */
      zoom_direction?: 'none' | 'in' | 'out';
    }
  }

  export interface Variant22 {
    action_id: 'stitch-videos';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant22.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant22.Params;
  }

  export namespace Variant22 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Output Aspect Ratio
       */
      aspect_ratio?:
        | 'auto'
        | '21:9'
        | '16:9'
        | '3:2'
        | '4:3'
        | '5:4'
        | '1:1'
        | '4:5'
        | '3:4'
        | '2:3'
        | '9:16'
        | '9:21';

      /**
       * Background Color
       */
      background_color?: string;

      /**
       * Background Mode
       */
      background_mode?: 'solid' | 'blur';

      /**
       * Blur Amount
       */
      blur_amount?: number;

      /**
       * Fit Mode
       */
      fit_mode?: 'contain' | 'cover';

      /**
       * Transition
       */
      transition?: 'none' | 'fade' | 'wipeleft' | 'wiperight';

      /**
       * Transition Duration (s)
       */
      transition_duration?: number;
    }
  }

  export interface Variant23 {
    action_id: 'split-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant23.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant23.Params;
  }

  export namespace Variant23 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Scene Sensitivity
       */
      scene_sensitivity?: number;

      /**
       * Segment Duration (s)
       */
      segment_duration?: number;

      /**
       * Number of Segments
       */
      segments?: number;

      /**
       * Split Mode
       */
      split_mode?: 'equal' | 'duration' | 'scene';

      /**
       * Strip Audio
       */
      strip_audio?: boolean;

      /**
       * Trim Handles (s)
       */
      trim_handles?: number;
    }
  }

  export interface Variant24 {
    action_id: 'extract-video-frames';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant24.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant24.Params;
  }

  export namespace Variant24 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Every (s)
       */
      every_seconds?: number;

      /**
       * Frame Count
       */
      frame_count?: number;

      /**
       * Frames
       */
      mode?: 'single' | 'evenly' | 'interval' | 'scene';

      /**
       * Video Range (%)
       */
      range?: Params.Range;

      /**
       * Scene Sensitivity
       */
      scene_sensitivity?: number;

      /**
       * Time (%)
       */
      time_percent?: number;
    }

    export namespace Params {
      /**
       * Video Range (%)
       */
      export interface Range {
        max: number;

        min: number;
      }
    }
  }

  export interface Variant25 {
    action_id: 'color-grade-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant25.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant25.Params;
  }

  export namespace Variant25 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Brightness
       */
      brightness?: number;

      /**
       * Contrast
       */
      contrast?: number;

      /**
       * Gamma
       */
      gamma?: number;

      /**
       * Saturation
       */
      saturation?: number;
    }
  }

  export interface Variant26 {
    action_id: 'video-to-frame-grid';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant26.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant26.Params;
  }

  export namespace Variant26 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Background Color
       */
      background?: string;

      /**
       * Cell Width (px)
       */
      cell_width?: number;

      /**
       * Columns
       */
      cols?: number;

      /**
       * Gap Between Cells (px)
       */
      gap?: number;

      /**
       * Rows
       */
      rows?: number;
    }
  }

  export interface Variant27 {
    action_id: 'boomerang-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant27.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant27.Params;
  }

  export namespace Variant27 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Include Audio
       */
      include_audio?: boolean;

      /**
       * Speed
       */
      speed?: number;
    }
  }

  export interface Variant28 {
    action_id: 'reverse-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant28.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant28.Params;
  }

  export namespace Variant28 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Audio
       */
      audio_mode?: 'strip' | 'reverse' | 'keep';
    }
  }

  export interface Variant29 {
    action_id: 'video-to-long-exposure';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant29.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant29.Params;
  }

  export namespace Variant29 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Blend Mode
       */
      blend_mode?: 'average' | 'lighten' | 'darken';

      /**
       * Frame Stride (sample every N frames)
       */
      frame_stride?: number;

      /**
       * Max Frames to Sample
       */
      max_frames?: number;
    }
  }

  export interface Variant30 {
    action_id: 'video-effect';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant30.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant30.Params;
  }

  export namespace Variant30 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Channel Offset (px)
       */
      chromatic_offset?: number;

      /**
       * Effect
       */
      effect?: 'vignette' | 'grain' | 'pixelate' | 'shake' | 'chromatic' | 'vhs';

      /**
       * Grain Strength
       */
      grain_strength?: number;

      /**
       * Block Size (px)
       */
      pixel_block_size?: number;

      /**
       * Shake Amount (px)
       */
      shake_amount?: number;

      /**
       * Vignette Falloff
       */
      vignette_angle?: number;
    }
  }

  export interface Variant31 {
    action_id: 'color-filter-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant31.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant31.Params;
  }

  export namespace Variant31 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * B&W Threshold
       */
      bw_threshold?: number;

      /**
       * Filter
       */
      filter?:
        | 'grayscale'
        | 'sepia'
        | 'invert'
        | 'bw'
        | 'posterize'
        | 'solarize'
        | 'clarendon'
        | 'moon'
        | 'nashville'
        | 'noir'
        | 'fade'
        | 'crossprocess';

      /**
       * Grain
       */
      grain?: number;

      /**
       * Posterize Bits
       */
      posterize_bits?: number;

      /**
       * Solarize Threshold
       */
      solarize_threshold?: number;
    }
  }

  export interface Variant32 {
    action_id: 'speed-up-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant32.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant32.Params;
  }

  export namespace Variant32 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Speed Factor (x)
       */
      factor?: number;

      /**
       * Keep Audio (pitch-preserved)
       */
      keep_audio?: boolean;
    }
  }

  export interface Variant33 {
    action_id: 'slow-down-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant33.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant33.Params;
  }

  export namespace Variant33 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Slow Factor (x)
       */
      factor?: number;

      /**
       * Keep Audio (pitch-preserved)
       */
      keep_audio?: boolean;

      /**
       * Smoothing
       */
      smoothing?: 'off' | 'blend' | 'motion';
    }
  }

  export interface Variant34 {
    action_id: 'duplicate-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant34.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant34.Params;
  }

  export namespace Variant34 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Copies
       */
      count?: number;
    }
  }

  export interface Variant35 {
    action_id: 'greenscreen-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant35.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant35.Params;
  }

  export namespace Variant35 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Edge Blend (softness)
       */
      blend?: number;

      /**
       * Background Preset
       */
      color_preset?: 'green' | 'blue' | 'custom';

      /**
       * Custom Background Color
       */
      custom_color?: string;

      /**
       * Similarity (how close to key color counts)
       */
      similarity?: number;

      /**
       * Spill Suppression
       */
      spill?: boolean;
    }
  }

  export interface Variant36 {
    action_id: 'resize-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant36.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant36.Params;
  }

  export namespace Variant36 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Custom Resolution (px)
       */
      custom_resolution?: number;

      /**
       * Resolution
       */
      resolution?: '240' | '360' | '480' | '540' | '720' | '1080' | '1440' | '2160' | 'custom';
    }
  }

  export interface Variant37 {
    action_id: 'change-video-ar';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant37.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant37.Params;
  }

  export namespace Variant37 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Aspect Ratio
       */
      aspect_ratio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '3:2' | '2:3' | '21:9';

      /**
       * Background
       */
      background_mode?: 'solid' | 'blur';

      /**
       * Blur Amount
       */
      blur_amount?: number;

      /**
       * Fit
       */
      fit?: 'crop' | 'pad';

      /**
       * Pad Color
       */
      pad_color?: string;
    }
  }

  export interface Variant38 {
    action_id: 'split-audio-from-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant38.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant38.Params;
  }

  export namespace Variant38 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Audio Format
       */
      audio_format?: 'auto' | 'm4a' | 'mp3' | 'wav';
    }
  }

  export interface Variant39 {
    action_id: 'merge-audio-into-video';

    /**
     * Action inputs. Direct action runs are headless and read inputs from URLs/text
     * rather than canvas edges.
     */
    inputs: Array<Variant39.Input>;

    /**
     * Project identifier. Use the public API ID returned by list projects; it must
     * start with prj\_. Used for ownership, billing, and run history. Direct action
     * runs do not mutate the project canvas.
     */
    project_id: string;

    /**
     * Workspace identifier. Use the public API ID returned by list workspaces; it must
     * start with ws\_.
     */
    workspace_id: string;

    /**
     * Action parameters
     */
    params?: Variant39.Params;
  }

  export namespace Variant39 {
    export interface Input {
      /**
       * Action input type
       */
      type: 'image' | 'video' | 'audio' | 'text';

      /**
       * Optional input name
       */
      name?: string;

      /**
       * Input text value
       */
      text?: string;

      /**
       * Input media URL
       */
      url?: string;
    }

    /**
     * Action parameters
     */
    export interface Params {
      /**
       * Duration
       */
      duration?: 'shortest' | 'video' | 'audio';
    }
  }
}

export declare namespace Actions {
  export {
    type ActionRetrieveResponse as ActionRetrieveResponse,
    type ActionListResponse as ActionListResponse,
    type ActionRunResponse as ActionRunResponse,
    type ActionRunParams as ActionRunParams,
  };
}
