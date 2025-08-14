export default function ProductStaticData() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc"
        }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>Product</th>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>Category</th>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>Price</th>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>Availability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>Spectre pro x360</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>Ultrabook</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>$4,999</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>
              <span
                style={{
                  background: "#d1fae5",
                  color: "#065f46",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12
                }}
              >
                In Stock
              </span>
            </td>
          </tr>
           <tr>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>Spectre x360</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>ProBook</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>$2,999</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>
              <span
                style={{
                  background: "#d1fae5",
                  color: "#065f46",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12
                }}
              >
                In Stock
              </span>
            </td>
          </tr>
           <tr>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>Spectre probook yoga x360</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>ProBook</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>$2,099</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>
              <span
                style={{
                  background: "#d1fae5",
                  color: "#065f46",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12
                }}
              >
                In Stock
              </span>
            </td>
          </tr>
           <tr>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>Spectre build Pro x360</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>ProBook</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>$3,999</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>
              <span
                style={{
                  background: "#d1fae5",
                  color: "#065f46",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12
                }}
              >
                In Stock
              </span>
            </td>
          </tr>
           <tr>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>Spectre yoga x360</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>Ultrabook pro</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>$1,999</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>
              <span
                style={{
                  background: "#d1fae5",
                  color: "#065f46",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12
                }}
              >
                In Stock
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
