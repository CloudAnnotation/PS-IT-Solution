import { Accent, SectionHead, Tag } from "@/components/ui";

/**
 * Portfolio section. All three projects are fictional concepts, labelled as
 * such on the page. Replace with approved case studies when available.
 */
export function FeaturedWork() {
  return (
    <section className="section band-paper" aria-labelledby="home-work">
      <div className="wrap">
        <SectionHead
          id="home-work"
          eyebrow="Featured work"
          title={
            <>
              The kind of products <Accent>we build.</Accent>
            </>
          }
          lede="These are fictional concepts that show the kind of work we take on. Real case studies will replace them once client work is cleared for publication."
        />
        <div className="work">
          <article className="case big rv">
            <div className="case-art" aria-hidden="true">
              <Tag>Fictional concept · Demo</Tag>
              <div className="scene s-fleet">
                <div className="mapbg" />
                <svg className="route" viewBox="0 0 600 440" preserveAspectRatio="none">
                  <path
                    d="M40 380 C 140 300, 160 210, 260 220 S 380 120, 470 90"
                    fill="none"
                    stroke="#FF6B57"
                    strokeWidth="3"
                    strokeDasharray="2 9"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60 140 C 150 170, 220 300, 330 320 S 470 340, 560 300"
                    fill="none"
                    stroke="#CDBBD8"
                    strokeOpacity=".5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="220" r="8" fill="#FF6B57" />
                  <circle cx="260" cy="220" r="18" fill="#FF6B57" fillOpacity=".2" />
                  <circle cx="330" cy="320" r="6" fill="#E8D9E3" />
                  <circle cx="470" cy="90" r="6" fill="#E8D9E3" />
                  <circle cx="40" cy="380" r="6" fill="#E8D9E3" />
                </svg>
                <div className="panel">
                  <b>Active routes</b>
                  <div className="row">
                    <i />
                    Route 12<span>On time</span>
                  </div>
                  <div className="row w">
                    <i />
                    Route 07<span>+8 min</span>
                  </div>
                  <div className="row">
                    <i />
                    Route 31<span>On time</span>
                  </div>
                </div>
                <div className="kpi-f">
                  <div>
                    <small>Vehicles</small>48
                  </div>
                  <div>
                    <small>On-time</small>96%
                  </div>
                </div>
              </div>
            </div>
            <div className="case-meta">
              <div>
                <h3>
                  Fleet operations console <span className="sr-only">(fictional concept)</span>
                </h3>
                <p>A real-time dispatch dashboard concept: live routes, exceptions and driver status in one view.</p>
              </div>
              <span className="sector">Logistics</span>
            </div>
          </article>

          <article className="case rv">
            <div className="case-art" aria-hidden="true">
              <Tag>Fictional concept · Demo</Tag>
              <div className="scene s-intake">
                <div className="phn">
                  <b>Check-in</b>
                  <span className="prog">
                    <i className="on" />
                    <i className="on" />
                    <i />
                  </span>
                  <span className="fld" />
                  <span className="fld" />
                  <span className="chk">
                    <i />
                    <span />
                  </span>
                  <span className="bt" />
                </div>
                <div className="phn alt">
                  <b>Your visit</b>
                  <span className="prog">
                    <i className="on" />
                    <i className="on" />
                    <i className="on" />
                  </span>
                  <span className="fld" />
                  <span className="chk">
                    <i />
                    <span />
                  </span>
                  <span className="chk">
                    <i />
                    <span />
                  </span>
                </div>
              </div>
            </div>
            <div className="case-meta">
              <div>
                <h3>
                  Patient intake app <span className="sr-only">(fictional concept)</span>
                </h3>
                <p>A mobile check-in flow concept that replaces clipboard paperwork.</p>
              </div>
              <span className="sector">Healthcare</span>
            </div>
          </article>

          <article className="case rv">
            <div className="case-art" aria-hidden="true">
              <Tag>Fictional concept · Demo</Tag>
              <div className="scene s-order">
                <div className="tbl">
                  <div className="th">
                    <span>Order</span>
                    <span>Account</span>
                    <span>Qty</span>
                    <span>Status</span>
                  </div>
                  <div className="tr">
                    <b>#10482</b>
                    <span>Retail 04</span>
                    <span>120</span>
                    <span className="st c">Picking</span>
                  </div>
                  <div className="tr">
                    <b>#10481</b>
                    <span>Retail 11</span>
                    <span>36</span>
                    <span className="st">Shipped</span>
                  </div>
                  <div className="tr">
                    <b>#10479</b>
                    <span>Retail 02</span>
                    <span>240</span>
                    <span className="st">Shipped</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="case-meta">
              <div>
                <h3>
                  Wholesale ordering portal <span className="sr-only">(fictional concept)</span>
                </h3>
                <p>A self-service B2B ordering concept with account pricing and order tracking.</p>
              </div>
              <span className="sector">Distribution</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
