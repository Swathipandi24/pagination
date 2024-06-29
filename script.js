document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const pagination = document.getElementById("pagination");
    const itemsPerPage = 10;
    let currentPage = 1;
    let data = [];

    // Fetch the data from the provided JSON URL
    fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json")
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            renderContent(currentPage);
            renderPagination();
        })
        .catch(error => console.error('Error fetching data:', error));

    const renderContent = (page) => {
        content.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = data.slice(start, end);
        items.forEach(item => {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.textContent = `ID: ${item.id}`;
            td.addEventListener("click", () => showDetails(item));
            tr.appendChild(td);
            content.appendChild(tr);
        });
    };

    const showDetails = (item) => {
        const detailRow = document.createElement("tr");
        detailRow.innerHTML = `
            <td colspan="1">
                <div><strong>ID:</strong> ${item.id}</div>
                <div><strong>Name:</strong> ${item.name}</div>
                <div><strong>Email:</strong> ${item.email}</div>
            </td>
        `;
        // Remove previous detail rows if any
        const existingDetailRow = document.querySelector(".detail-row");
        if (existingDetailRow) {
            existingDetailRow.remove();
        }
        detailRow.classList.add("detail-row");
        content.appendChild(detailRow);
    };

    const renderPagination = () => {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(data.length / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = i;
            a.href = "#";
            if (i === currentPage) {
                a.classList.add("active");
            }
            a.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = i;
                renderContent(currentPage);
                renderPagination();
            });
            li.appendChild(a);
            pagination.appendChild(li);
        }
    };

    document.getElementById("first").addEventListener("click", () => {
        currentPage = 1;
        renderContent(currentPage);
        renderPagination();
    });

    document.getElementById("prev").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderContent(currentPage);
            renderPagination();
        }
    });

    document.getElementById("next").addEventListener("click", () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderContent(currentPage);
            renderPagination();
        }
    });

    document.getElementById("last").addEventListener("click", () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        currentPage = totalPages;
        renderContent(currentPage);
        renderPagination();
    });
});
